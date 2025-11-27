#!/usr/bin/env ts-node

/**
 * Type Generation Script
 * 
 * Reads entity specs from /specs/data-models/entities/*.md
 * Extracts TypeScript interfaces and generates type files
 * Outputs to:
 *   - backend/src/domain/entities/
 *   - mobile/src/types/entities/
 */

import * as fs from 'fs';
import * as path from 'path';

interface TypeDefinition {
  name: string;
  content: string;
  file: string;
}

const SPECS_DIR = path.join(__dirname, '../specs/data-models/entities');
const BACKEND_OUTPUT_DIR = path.join(__dirname, '../backend/src/domain/entities');
const MOBILE_OUTPUT_DIR = path.join(__dirname, '../mobile/src/types/entities');

/**
 * Extract TypeScript interfaces from markdown file
 */
function extractInterfaces(markdownContent: string, fileName: string): TypeDefinition[] {
  const types: TypeDefinition[] = [];
  
  // Match TypeScript code blocks
  const codeBlockRegex = /```typescript\n([\s\S]*?)```/g;
  let match;
  
  while ((match = codeBlockRegex.exec(markdownContent)) !== null) {
    const codeContent = match[1];
    
    // Extract interface names
    const interfaceRegex = /(?:export\s+)?interface\s+(\w+)/g;
    let interfaceMatch;
    
    while ((interfaceMatch = interfaceRegex.exec(codeContent)) !== null) {
      const interfaceName = interfaceMatch[1];
      
      // Extract the full interface definition
      // Find the interface block (from interface to closing brace)
      const interfaceStart = codeContent.indexOf(`interface ${interfaceName}`);
      if (interfaceStart === -1) continue;
      
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
      
      const interfaceContent = codeContent.substring(interfaceStart, interfaceEnd);
      
      // Also check for related types in comments or after the interface
      // Extract any type aliases or enums that might be in the same block
      const fullBlock = codeContent.substring(0, interfaceEnd);
      const relatedTypes: string[] = [];
      
      // Look for type aliases
      const typeAliasRegex = /type\s+(\w+)\s*=/g;
      let typeMatch;
      while ((typeMatch = typeAliasRegex.exec(fullBlock)) !== null) {
        relatedTypes.push(typeMatch[1]);
      }
      
      types.push({
        name: interfaceName,
        content: interfaceContent,
        file: fileName,
      });
    }
  }
  
  return types;
}

/**
 * Generate TypeScript file content
 */
function generateTypeFile(types: TypeDefinition[], specFileName: string): string {
  const baseName = path.basename(specFileName, '.md');
  const header = `/**
 * ${baseName.charAt(0).toUpperCase() + baseName.slice(1).replace(/-/g, ' ')} Entity
 * 
 * Auto-generated from specs/data-models/entities/${specFileName}
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

`;

  // Combine all interfaces from the file
  const interfaces = types.map(t => {
    // Ensure export keyword is present
    let content = t.content.trim();
    if (!content.startsWith('export')) {
      content = 'export ' + content;
    }
    return content;
  }).join('\n\n');

  return header + interfaces + '\n';
}

/**
 * Process a single spec file
 */
function processSpecFile(filePath: string): void {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const types = extractInterfaces(content, fileName);
  
  if (types.length === 0) {
    console.warn(`⚠️  No TypeScript interfaces found in ${fileName}`);
    return;
  }
  
  // Generate output file
  const baseName = path.basename(fileName, '.md');
  const outputFileName = `${baseName.charAt(0).toUpperCase() + baseName.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}.ts`;
  
  const typeFileContent = generateTypeFile(types, fileName);
  
  // Write to backend
  const backendOutputPath = path.join(BACKEND_OUTPUT_DIR, outputFileName);
  fs.writeFileSync(backendOutputPath, typeFileContent, 'utf-8');
  console.log(`✅ Generated: ${backendOutputPath}`);
  
  // Write to mobile
  const mobileOutputPath = path.join(MOBILE_OUTPUT_DIR, outputFileName);
  fs.writeFileSync(mobileOutputPath, typeFileContent, 'utf-8');
  console.log(`✅ Generated: ${mobileOutputPath}`);
}

/**
 * Main function
 */
function main(): void {
  console.log('🚀 Starting type generation from entity specs...\n');
  
  // Ensure output directories exist
  if (!fs.existsSync(BACKEND_OUTPUT_DIR)) {
    fs.mkdirSync(BACKEND_OUTPUT_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(MOBILE_OUTPUT_DIR)) {
    fs.mkdirSync(MOBILE_OUTPUT_DIR, { recursive: true });
  }
  
  // Read all markdown files from specs directory
  const files = fs.readdirSync(SPECS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(SPECS_DIR, file));
  
  if (files.length === 0) {
    console.error('❌ No markdown files found in specs directory');
    process.exit(1);
  }
  
  console.log(`Found ${files.length} spec file(s)\n`);
  
  // Process each file
  files.forEach(file => {
    try {
      processSpecFile(file);
    } catch (error) {
      console.error(`❌ Error processing ${path.basename(file)}:`, error);
    }
  });
  
  console.log('\n✨ Type generation complete!');
}

// Run if executed directly
if (require.main === module) {
  main();
}

