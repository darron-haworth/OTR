#!/usr/bin/env ts-node

/**
 * API Client Generation Script
 * 
 * Reads endpoint specs from /specs/api/endpoints/*.md
 * Generates:
 *   - TypeScript types for requests/responses
 *   - Zod validation schemas for backend
 *   - API client functions for mobile
 */

import * as fs from 'fs';
import * as path from 'path';

interface EndpointSpec {
  method: string;
  path: string;
  name: string;
  requestType?: string;
  responseType?: string;
  pathParams?: string[];
  queryParams?: string[];
  description: string;
  statusCodes: Record<string, string>;
}

/**
 * Parse endpoint spec from markdown
 */
function parseEndpointSpec(content: string, fileName: string): EndpointSpec | null {
  const spec: Partial<EndpointSpec> = {
    name: '',
    method: '',
    path: '',
    description: '',
    statusCodes: {},
  };
  
  // Extract endpoint line: `POST /api/users/register` or `GET /api/backups/{cloudGuid}/list`
  const endpointMatch = content.match(/#\s+(\w+)\s+(\/api\/[^\s]+)/);
  if (!endpointMatch) {
    console.warn(`⚠️  Could not parse endpoint from ${fileName}`);
    return null;
  }
  
  spec.method = endpointMatch[1];
  spec.path = endpointMatch[2];
  
  // Extract path parameters
  const pathParams: string[] = [];
  const pathParamRegex = /\{(\w+)\}/g;
  let paramMatch;
  while ((paramMatch = pathParamRegex.exec(spec.path)) !== null) {
    pathParams.push(paramMatch[1]);
  }
  spec.pathParams = pathParams;
  
  // Extract description
  const descMatch = content.match(/## Description\s*\n\s*(.+?)(?:\n##|\n```|$)/s);
  if (descMatch) {
    spec.description = descMatch[1].trim();
  }
  
  // Extract request interface
  const requestMatch = content.match(/## Request\s*\n\s*```typescript\s*\ninterface\s+(\w+)\s*\{([^}]+)\}\s*```/s);
  if (requestMatch) {
    spec.requestType = requestMatch[1];
  }
  
  // Extract response interface - handle multi-line and nested structures
  const responseSection = content.match(/## Response\s*\n\s*```typescript\s*\n([\s\S]*?)```/);
  if (responseSection) {
    const responseCode = responseSection[1];
    const responseInterfaceMatch = responseCode.match(/interface\s+(\w+)/);
    if (responseInterfaceMatch) {
      spec.responseType = responseInterfaceMatch[1];
    }
  }
  
  // Extract status codes
  const statusCodesSection = content.match(/## Status Codes\s*\n((?:- `\d+`[^\n]+\n?)+)/);
  if (statusCodesSection) {
    const statusCodeRegex = /- `(\d+)`\s*-\s*(.+)/g;
    let statusMatch;
    while ((statusMatch = statusCodeRegex.exec(statusCodesSection[1])) !== null) {
      spec.statusCodes![statusMatch[1]] = statusMatch[2].trim();
    }
  }
  
  // Generate name from path - better naming logic
  const pathParts = spec.path.split('/').filter(p => p && p !== 'api');
  
  // Extract resource name (usually the first part after /api)
  const resourceName = pathParts[0] || 'unknown';
  
  // Determine action from method and path
  let action = '';
  if (spec.method === 'GET') {
    if (pathParts.length === 1 || pathParts[pathParts.length - 1] === 'list') {
      action = 'list';
    } else {
      action = 'get';
    }
  } else if (spec.method === 'POST') {
    action = 'create';
  } else if (spec.method === 'PUT' || spec.method === 'PATCH') {
    action = 'update';
  } else if (spec.method === 'DELETE') {
    action = 'delete';
  }
  
  // Convert resource name to PascalCase and combine with action
  const resourcePascal = resourceName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  spec.name = `${resourcePascal}${action.charAt(0).toUpperCase() + action.slice(1)}`;
  
  return spec as EndpointSpec;
}

/**
 * Generate Zod schema from TypeScript interface
 */
function generateZodSchema(interfaceName: string, interfaceContent: string): string {
  // Extract the interface body (content between braces)
  const bodyMatch = interfaceContent.match(/\{([\s\S]*)\}/);
  if (!bodyMatch) {
    return `// Could not parse interface ${interfaceName}\n`;
  }
  
  const body = bodyMatch[1];
  const lines = body.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
  
  let zodSchema = `/**
 * Zod schema for ${interfaceName}
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';\n\n`;
  zodSchema += `export const ${interfaceName}Schema = z.object({\n`;
  
  for (const line of lines) {
    // Skip comments and empty lines
    if (line.startsWith('//') || !line.includes(':')) continue;
    
    // Parse field: type format
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const fieldPart = line.substring(0, colonIndex).trim();
    const typePart = line.substring(colonIndex + 1).trim();
    
    // Remove trailing comma and optional marker
    const cleanField = fieldPart.replace(/[?,]/g, '').trim();
    const isOptional = fieldPart.includes('?');
    
    if (!cleanField || cleanField === '{' || cleanField === '}') continue;
    
    // Extract type (remove comments)
    const type = typePart.split('//')[0].trim().replace(/[,;]/g, '');
    
    // Map TypeScript types to Zod types
    let zodType = 'z.string()';
    if (type === 'number' || type.includes('number')) {
      zodType = 'z.number()';
    } else if (type === 'boolean' || type.includes('boolean')) {
      zodType = 'z.boolean()';
    } else if (type.includes('Array<') || type.endsWith('[]')) {
      // Extract array element type
      const elementType = type.match(/Array<(\w+)>/) || type.match(/(\w+)\[\]/);
      if (elementType) {
        const elemType = elementType[1];
        if (elemType === 'string') {
          zodType = 'z.array(z.string())';
        } else if (elemType === 'number') {
          zodType = 'z.array(z.number())';
        } else {
          zodType = `z.array(z.unknown())`; // For complex types
        }
      } else {
        zodType = 'z.array(z.unknown())';
      }
    } else if (type.includes('|')) {
      // Union types - use enum or string
      zodType = 'z.string()'; // Simplified
    } else if (type === 'string' || type.includes('string')) {
      zodType = 'z.string()';
    } else if (type.includes('Timestamp')) {
      zodType = 'z.any()'; // Firebase Timestamp
    } else {
      zodType = 'z.unknown()'; // For custom types
    }
    
    zodSchema += `  ${cleanField}: ${zodType}${isOptional ? '.optional()' : ''},\n`;
  }
  
  zodSchema += '});\n';
  zodSchema += `\nexport type ${interfaceName} = z.infer<typeof ${interfaceName}Schema>;\n`;
  
  return zodSchema;
}

/**
 * Generate API client function for mobile
 */
function generateApiClientFunction(spec: EndpointSpec): string {
  // Convert PascalCase to camelCase
  const functionName = spec.name.charAt(0).toLowerCase() + spec.name.slice(1);
  const method = spec.method.toLowerCase();
  
  let params = '';
  let pathWithParams = spec.path;
  
  // Handle path parameters
  if (spec.pathParams && spec.pathParams.length > 0) {
    params = spec.pathParams.map(p => `${p}: string`).join(', ');
    spec.pathParams.forEach(param => {
      pathWithParams = pathWithParams.replace(`{${param}}`, `\${${param}}`);
    });
  }
  
  // Handle request body
  if (spec.requestType) {
    if (params) params += ', ';
    params += `data: ${spec.requestType}`;
  }
  
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(spec.method);
  const bodyParam = hasBody && spec.requestType ? 'data' : '';
  
  return `
/**
 * ${spec.description}
 * ${spec.method} ${spec.path}
 */
export async function ${functionName}(${params || ''}): Promise<${spec.responseType || 'void'}> {
  const url = \`\${API_BASE_URL}${pathWithParams}\`;
  
  const response = await fetch(url, {
    method: '${spec.method}',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    ${bodyParam ? `body: JSON.stringify(${bodyParam}),` : ''}
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`API Error: \${response.status} \${response.statusText} - \${errorText}\`);
  }
  
  ${spec.responseType ? 'return response.json();' : ''}
}
`;
}

/**
 * Process endpoint spec file
 */
function processEndpointFile(filePath: string): {
  spec: EndpointSpec;
  interfaces: Record<string, { name: string; content: string }>;
  apiFunction: string;
} | null {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const spec = parseEndpointSpec(content, fileName);
  if (!spec) {
    return null;
  }
  
  // Extract full TypeScript interfaces from the file
  const codeBlockRegex = /```typescript\n([\s\S]*?)```/g;
  const interfaces: Record<string, { name: string; content: string }> = {};
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const codeContent = match[1];
    
    // Find all interfaces in this code block
    const interfaceRegex = /interface\s+(\w+)\s*\{/g;
    let interfaceMatch;
    
    while ((interfaceMatch = interfaceRegex.exec(codeContent)) !== null) {
      const interfaceName = interfaceMatch[1];
      const interfaceStart = interfaceMatch.index;
      
      // Find the matching closing brace
      let braceCount = 0;
      let interfaceEnd = interfaceStart;
      let inInterface = false;
      
      for (let i = interfaceStart; i < codeContent.length; i++) {
        const char = codeContent[i];
        if (char === '{') {
          braceCount++;
          inInterface = true;
        } else if (char === '}') {
          braceCount--;
          if (inInterface && braceCount === 0) {
            interfaceEnd = i + 1;
            break;
          }
        }
      }
      
      const fullInterface = codeContent.substring(interfaceStart, interfaceEnd);
      interfaces[interfaceName] = {
        name: interfaceName,
        content: fullInterface,
      };
    }
  }
  
  // Generate backend validator (Zod schema)
  if (spec.requestType && interfaces[spec.requestType]) {
    const validatorDir = path.join(__dirname, '../backend/src/api/validators');
    if (!fs.existsSync(validatorDir)) {
      fs.mkdirSync(validatorDir, { recursive: true });
    }
    
    const validatorContent = generateZodSchema(spec.requestType, interfaces[spec.requestType].content);
    const validatorPath = path.join(validatorDir, `${spec.name.toLowerCase()}-validator.ts`);
    fs.writeFileSync(validatorPath, validatorContent, 'utf-8');
    console.log(`✅ Generated validator: ${validatorPath}`);
  }
  
  // Generate mobile API client function
  const apiFunction = generateApiClientFunction(spec);
  
  // Generate types file for mobile
  const typesDir = path.join(__dirname, '../mobile/src/types/api');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }
  
  const typesContent = Object.values(interfaces).map(iface => {
    // Ensure export keyword is present
    let content = iface.content.trim();
    if (!content.startsWith('export')) {
      content = 'export ' + content;
    }
    return content;
  }).join('\n\n');
  
  const typesPath = path.join(typesDir, `${spec.name.toLowerCase()}-types.ts`);
  fs.writeFileSync(typesPath, `/**
 * API Types for ${spec.name}
 * Auto-generated from specs/api/endpoints/${fileName}
 */

${typesContent}
`, 'utf-8');
  console.log(`✅ Generated types: ${typesPath}`);
  
  return { spec, interfaces, apiFunction };
}

/**
 * Main function
 */
function main(): void {
  console.log('🚀 Starting API client generation from endpoint specs...\n');
  
  const ENDPOINTS_DIR = path.join(__dirname, '../specs/api/endpoints');
  
  // Read all markdown files from endpoints directory
  const files = fs.readdirSync(ENDPOINTS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(ENDPOINTS_DIR, file));
  
  if (files.length === 0) {
    console.error('❌ No markdown files found in endpoints directory');
    process.exit(1);
  }
  
  console.log(`Found ${files.length} endpoint spec file(s)\n`);
  
  // Process each file and collect API functions and types
  const apiFunctions: string[] = [];
  const typeImports = new Set<string>();
  
  files.forEach(file => {
    try {
      const result = processEndpointFile(file);
      if (result) {
        apiFunctions.push(result.apiFunction);
        
        // Collect types that need to be imported
        if (result.spec.requestType) {
          typeImports.add(result.spec.requestType);
        }
        if (result.spec.responseType) {
          typeImports.add(result.spec.responseType);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${path.basename(file)}:`, error);
    }
  });
  
  // Generate complete API client file
  const apiDir = path.join(__dirname, '../mobile/services/api');
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }
  
  // Generate type imports - collect all types and their files
  const typeToFileMap = new Map<string, string>();
  const typeFiles = fs.readdirSync(path.join(__dirname, '../mobile/src/types/api'))
    .filter(f => f.endsWith('-types.ts'));
  
  for (const typeFile of typeFiles) {
    const typeFilePath = path.join(__dirname, '../mobile/src/types/api', typeFile);
    const typeFileContent = fs.readFileSync(typeFilePath, 'utf-8');
    
    // Extract all exported types/interfaces from the file
    const interfaceMatches = typeFileContent.matchAll(/export\s+(?:interface|type)\s+(\w+)/g);
    for (const match of interfaceMatches) {
      typeToFileMap.set(match[1], typeFile.replace('.ts', ''));
    }
  }
  
  // Group imports by file to avoid duplicate imports
  const fileToTypes = new Map<string, string[]>();
  for (const typeName of typeImports) {
    const fileName = typeToFileMap.get(typeName);
    if (fileName) {
      if (!fileToTypes.has(fileName)) {
        fileToTypes.set(fileName, []);
      }
      fileToTypes.get(fileName)!.push(typeName);
    }
  }
  
  const typeImportStatements = Array.from(fileToTypes.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fileName, types]) => {
      const sortedTypes = types.sort().join(', ');
      return `import { ${sortedTypes} } from '../types/api/${fileName}';`;
    })
    .join('\n');
  
  const apiClientPath = path.join(apiDir, 'client.ts');
  const apiClientContent = `/**
 * API Client
 * Auto-generated from specs/api/endpoints/*.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:api' to regenerate
 */

import { getAuthHeaders, API_BASE_URL } from '../client';
${typeImportStatements ? '\n' + typeImportStatements : ''}

${apiFunctions.join('\n')}
`;
  
  fs.writeFileSync(apiClientPath, apiClientContent, 'utf-8');
  console.log(`✅ Generated API client: ${apiClientPath}`);
  
  console.log('\n✨ API client generation complete!');
}

// Run if executed directly
if (require.main === module) {
  main();
}

