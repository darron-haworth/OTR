import React, { useState, useEffect } from 'react';
import { Calendar, User, Users, Heart, Shield, Star, ChevronRight, Plus, Edit2, Check, X, Clock, Award, Sparkles } from 'lucide-react';

// Theme constants
const theme = {
  colors: {
    // Professional, solid palette with depth and sophistication
    primary: '#2E7D32',     // Forest green - growth and renewal
    secondary: '#1565C0',   // Deep blue - trust and stability
    accent: '#F57C00',      // Burnt orange - warmth and energy
    tertiary: '#5E35B1',    // Deep purple - wisdom and transformation
    dark: '#212121',        // Charcoal black
    light: '#FAFAFA',       // Pure white-gray
    surface: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
    warmGradient: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)',
    softGradient: 'linear-gradient(180deg, rgba(21,101,192,0.03) 0%, rgba(46,125,50,0.03) 100%)',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    accent: "'Space Mono', 'Courier New', monospace"
  }
};

// Custom CSS for animations and unique styling
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${theme.fonts.body};
    background: ${theme.colors.light};
    color: ${theme.colors.dark};
    line-height: 1.6;
  }
  
  .app-container {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  
  /* Animated background pattern */
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.02;
    pointer-events: none;
    background-image: 
      repeating-linear-gradient(45deg, transparent, transparent 35px, ${theme.colors.secondary} 35px, ${theme.colors.secondary} 70px),
      repeating-linear-gradient(-45deg, transparent, transparent 35px, ${theme.colors.primary} 35px, ${theme.colors.primary} 70px);
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-10px, -10px) rotate(0.5deg); }
    50% { transform: translate(10px, -5px) rotate(-0.5deg); }
    75% { transform: translate(-5px, 10px) rotate(0.5deg); }
  }
  
  /* Glassmorphism cards */
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(21, 101, 192, 0.1);
    box-shadow: 
      0 8px 32px rgba(21, 101, 192, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  
  /* Neumorphic elements */
  .neu-button {
    background: linear-gradient(145deg, #ffffff, #f5f5f5);
    box-shadow: 
      6px 6px 12px rgba(21, 101, 192, 0.1),
      -6px -6px 12px rgba(255, 255, 255, 0.9),
      inset 1px 1px 1px rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .neu-button:active {
    box-shadow: 
      inset 3px 3px 6px rgba(21, 101, 192, 0.1),
      inset -3px -3px 6px rgba(255, 255, 255, 0.9);
  }
  
  /* Milestone celebration animation */
  @keyframes celebrate {
    0% { transform: scale(1) rotate(0deg); }
    10% { transform: scale(1.1) rotate(-5deg); }
    20% { transform: scale(0.95) rotate(5deg); }
    30% { transform: scale(1.05) rotate(-3deg); }
    40% { transform: scale(1) rotate(0deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  
  .celebrate {
    animation: celebrate 0.6s ease-in-out;
  }
  
  /* Staggered fade in */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  
  /* Floating orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: orb-float 15s ease-in-out infinite;
  }
  
  @keyframes orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
`;

// Recovery groups data
const RECOVERY_GROUPS = [
  { id: 'aa', name: 'Alcoholics Anonymous', icon: '🌟' },
  { id: 'na', name: 'Narcotics Anonymous', icon: '💎' },
  { id: 'ga', name: 'Gamblers Anonymous', icon: '🎲' },
  { id: 'oa', name: 'Overeaters Anonymous', icon: '🍎' },
  { id: 'other', name: 'Other Recovery Program', icon: '💪' }
];

const OTRMilestoneTracker = () => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [userProfile, setUserProfile] = useState({
    localId: 'uuid-' + Math.random().toString(36).substr(2, 9),
    firstName: '',
    lastName: '',
    publicName: '',
    birthDate: '',
    recoveryGroups: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    encryptionVersion: 1
  });
  const [recoveryFriends, setRecoveryFriends] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingFriend, setEditingFriend] = useState(null);

  // Landing Screen Component
  const LandingScreen = () => (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="bg-pattern"></div>
      
      {/* Floating orbs for visual interest */}
      <div className="orb" style={{
        width: '300px',
        height: '300px',
        background: theme.colors.secondary,
        top: '-150px',
        right: '-100px'
      }}></div>
      <div className="orb" style={{
        width: '250px',
        height: '250px',
        background: theme.colors.primary,
        bottom: '50px',
        left: '-100px'
      }}></div>
      <div className="orb" style={{
        width: '200px',
        height: '200px',
        background: theme.colors.tertiary,
        top: '40%',
        left: '60%'
      }}></div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo and Title */}
        <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 1.5rem',
            background: theme.colors.warmGradient,
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(45deg)',
            boxShadow: '0 20px 40px rgba(46, 125, 50, 0.25)'
          }}>
            <div style={{ transform: 'rotate(-45deg)', fontSize: '3rem' }}>
              <Sparkles size={48} color="#fff" />
            </div>
          </div>
          
          <h1 style={{
            fontFamily: theme.fonts.display,
            fontSize: '2.5rem',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: theme.colors.warmGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Our Time<br/>Recovered
          </h1>
          
          <p style={{
            fontFamily: theme.fonts.body,
            fontSize: '1.1rem',
            color: theme.colors.dark,
            opacity: 0.7,
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            Your journey, your milestones, your community
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ marginBottom: '2rem' }}>
          {[
            { icon: Shield, text: 'Complete Privacy', color: theme.colors.primary },
            { icon: Heart, text: 'Supportive Community', color: theme.colors.secondary },
            { icon: Award, text: 'Track Milestones', color: theme.colors.accent }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`glass-card fade-in-up stagger-${index + 1}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                borderRadius: '20px',
                marginBottom: '1rem',
                opacity: 0
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '15px',
                background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}44)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <feature.icon size={24} color={feature.color} />
              </div>
              <span style={{ 
                fontWeight: '500',
                fontSize: '1.1rem',
                color: theme.colors.dark
              }}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-up stagger-4" style={{ opacity: 0 }}>
          <button
            onClick={() => setCurrentScreen('profile')}
            style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '20px',
              border: 'none',
              background: theme.colors.warmGradient,
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(46, 125, 50, 0.25)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Start Your Journey
            <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
          
          <button
            onClick={() => setCurrentScreen('friends')}
            style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '20px',
              border: `2px solid ${theme.colors.secondary}`,
              background: 'transparent',
              color: theme.colors.secondary,
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.secondary;
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = theme.colors.secondary;
            }}
          >
            View Recovery Friends
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Screen Component
  const ProfileScreen = () => {
    const [tempProfile, setTempProfile] = useState({ ...userProfile });
    const [selectedGroup, setSelectedGroup] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');

    const handleSaveProfile = () => {
      setUserProfile(tempProfile);
      setEditingProfile(false);
    };

    const addRecoveryGroup = () => {
      if (selectedGroup && recoveryDate) {
        setTempProfile({
          ...tempProfile,
          recoveryGroups: [
            ...tempProfile.recoveryGroups,
            {
              groupId: selectedGroup,
              recoveryDate: recoveryDate,
              isActive: true,
              notes: ''
            }
          ]
        });
        setSelectedGroup('');
        setRecoveryDate('');
      }
    };

    return (
      <div className="app-container">
        <div className="bg-pattern"></div>
        
        {/* Header */}
        <div style={{
          background: theme.colors.softGradient,
          padding: '1.5rem',
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setCurrentScreen('landing')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ←
            </button>
            <h2 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              My Profile
            </h2>
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="neu-button"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {editingProfile ? <Check size={18} /> : <Edit2 size={18} />}
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Profile Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '2rem auto',
            background: theme.colors.warmGradient,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(46, 125, 50, 0.2)',
            position: 'relative'
          }}>
            <User size={48} color="#fff" />
            {userProfile.recoveryGroups.length > 0 && (
              <div className="celebrate" style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: theme.colors.accent,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(255, 230, 109, 0.4)'
              }}>
                🏆
              </div>
            )}
          </div>

          {/* Profile Form */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            borderRadius: '20px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: theme.colors.primary
            }}>
              Personal Information
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: theme.colors.dark,
                opacity: 0.7
              }}>
                Public Name (shown to friends)
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.publicName : userProfile.publicName}
                onChange={(e) => setTempProfile({ ...tempProfile, publicName: e.target.value })}
                disabled={!editingProfile}
                placeholder="Your recovery name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: `2px solid ${editingProfile ? theme.colors.primary : '#e0e0e0'}`,
                  fontSize: '1rem',
                  background: editingProfile ? '#fff' : '#f8f8f8',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: theme.colors.dark,
                  opacity: 0.7
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={editingProfile ? tempProfile.firstName : userProfile.firstName}
                  onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
                  disabled={!editingProfile}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: `2px solid ${editingProfile ? theme.colors.secondary : '#e0e0e0'}`,
                    fontSize: '1rem',
                    background: editingProfile ? '#fff' : '#f8f8f8'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: theme.colors.dark,
                  opacity: 0.7
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={editingProfile ? tempProfile.lastName : userProfile.lastName}
                  onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                  disabled={!editingProfile}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: `2px solid ${editingProfile ? theme.colors.secondary : '#e0e0e0'}`,
                    fontSize: '1rem',
                    background: editingProfile ? '#fff' : '#f8f8f8'
                  }}
                />
              </div>
            </div>

            {editingProfile && (
              <button
                onClick={handleSaveProfile}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: theme.colors.primary,
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Recovery Groups */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            borderRadius: '20px'
          }}>
            <h3 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: theme.colors.primary
            }}>
              Recovery Programs
            </h3>

            {editingProfile && (
              <div style={{
                background: theme.colors.softGradient,
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a program...</option>
                  {RECOVERY_GROUPS.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.icon} {group.name}
                    </option>
                  ))}
                </select>
                
                <input
                  type="date"
                  value={recoveryDate}
                  onChange={(e) => setRecoveryDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                
                <button
                  onClick={addRecoveryGroup}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: theme.colors.accent,
                    color: theme.colors.dark,
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Program
                </button>
              </div>
            )}

            {tempProfile.recoveryGroups.map((group, index) => {
              const programInfo = RECOVERY_GROUPS.find(g => g.id === group.groupId);
              const daysSince = Math.floor((new Date() - new Date(group.recoveryDate)) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #fff, #fafafa)',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '0.75rem',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
                        {programInfo?.icon}
                      </span>
                      <div>
                        <div style={{ fontWeight: '600' }}>
                          {programInfo?.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: theme.colors.accent, fontWeight: '600' }}>
                          {daysSince} days
                        </div>
                      </div>
                    </div>
                    <Clock size={16} color={theme.colors.primary} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Friends List Screen Component
  const FriendsScreen = () => {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [newFriend, setNewFriend] = useState({
      id: '',
      publicName: '',
      firstName: '',
      lastName: '',
      recoveryGroups: [],
      connectionDate: new Date().toISOString(),
      notes: ''
    });
    const [selectedGroup, setSelectedGroup] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');

    const handleAddFriend = () => {
      if (newFriend.publicName) {
        setRecoveryFriends([
          ...recoveryFriends,
          { ...newFriend, id: 'friend-' + Math.random().toString(36).substr(2, 9) }
        ]);
        setNewFriend({
          id: '',
          publicName: '',
          firstName: '',
          lastName: '',
          recoveryGroups: [],
          connectionDate: new Date().toISOString(),
          notes: ''
        });
        setSelectedGroup('');
        setRecoveryDate('');
        setShowAddFriend(false);
      }
    };

    const addRecoveryGroupToFriend = () => {
      if (selectedGroup && recoveryDate) {
        setNewFriend({
          ...newFriend,
          recoveryGroups: [
            ...newFriend.recoveryGroups,
            {
              groupId: selectedGroup,
              recoveryDate: recoveryDate,
              isActive: true,
              notes: ''
            }
          ]
        });
        setSelectedGroup('');
        setRecoveryDate('');
      }
    };

    const getTimeInRecovery = (date) => {
      const start = new Date(date);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return { value: diffDays, unit: 'days', milestone: diffDays === 1 || diffDays === 7 || diffDays === 14 };
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return { value: months, unit: months === 1 ? 'month' : 'months', milestone: months % 3 === 0 };
      } else {
        const years = Math.floor(diffDays / 365);
        const remainingMonths = Math.floor((diffDays % 365) / 30);
        if (remainingMonths > 0) {
          return { value: `${years}y ${remainingMonths}m`, unit: '', milestone: remainingMonths === 0 };
        }
        return { value: years, unit: years === 1 ? 'year' : 'years', milestone: true };
      }
    };

    const getMilestoneBadge = (time) => {
      if (time.unit === 'days') {
        if (time.value === 1) return '🌱';
        if (time.value === 7) return '📅';
        if (time.value === 14) return '💪';
        if (time.value === 30) return '⭐';
      } else if (time.unit === 'months' || time.unit === 'month') {
        if (time.value === 1) return '⭐';
        if (time.value === 3) return '🏆';
        if (time.value === 6) return '🎖️';
        if (time.value === 9) return '🌟';
      } else if (time.unit === 'years' || time.unit === 'year') {
        if (time.value === 1) return '🎂';
        if (time.value >= 2) return '👑';
      }
      return null;
    };

    return (
      <div className="app-container">
        <div className="bg-pattern"></div>
        
        {/* Header */}
        <div style={{
          background: theme.colors.softGradient,
          padding: '1.5rem',
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setCurrentScreen('landing')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ←
            </button>
            <h2 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Recovery Friends
            </h2>
            <button
              onClick={() => setShowAddFriend(true)}
              className="neu-button"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Friends Count */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: theme.colors.warmGradient,
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              boxShadow: '0 8px 20px rgba(46, 125, 50, 0.25)'
            }}>
              <Users size={20} style={{ marginRight: '0.5rem' }} />
              {recoveryFriends.length} Recovery {recoveryFriends.length === 1 ? 'Friend' : 'Friends'}
            </div>
          </div>

          {/* Add Friend Form */}
          {showAddFriend && (
            <div className="glass-card fade-in-up" style={{
              padding: '1.5rem',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}>
              <h3 style={{
                fontFamily: theme.fonts.display,
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: theme.colors.secondary
              }}>
                Add Recovery Friend
              </h3>
              
              <input
                type="text"
                placeholder="Friend's recovery name"
                value={newFriend.publicName}
                onChange={(e) => setNewFriend({ ...newFriend, publicName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px solid ' + theme.colors.primary,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={newFriend.firstName}
                  onChange={(e) => setNewFriend({ ...newFriend, firstName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="Last name (optional)"
                  value={newFriend.lastName}
                  onChange={(e) => setNewFriend({ ...newFriend, lastName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Recovery Programs Section */}
              <div style={{
                background: theme.colors.softGradient,
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ 
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: theme.colors.secondary
                }}>
                  Recovery Programs
                </h4>
                
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a program...</option>
                  {RECOVERY_GROUPS.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.icon} {group.name}
                    </option>
                  ))}
                </select>
                
                <input
                  type="date"
                  value={recoveryDate}
                  onChange={(e) => setRecoveryDate(e.target.value)}
                  placeholder="Recovery date"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                
                <button
                  onClick={addRecoveryGroupToFriend}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: theme.colors.accent,
                    color: theme.colors.dark,
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Program
                </button>

                {/* Show added programs */}
                {newFriend.recoveryGroups.map((group, index) => {
                  const programInfo = RECOVERY_GROUPS.find(g => g.id === group.groupId);
                  const timeInRecovery = getTimeInRecovery(group.recoveryDate);
                  
                  return (
                    <div key={index} style={{
                      background: '#fff',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      marginTop: '0.75rem',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
                          {programInfo?.icon}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                            {programInfo?.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: theme.colors.accent }}>
                            {timeInRecovery.value} {timeInRecovery.unit}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setNewFriend({
                            ...newFriend,
                            recoveryGroups: newFriend.recoveryGroups.filter((_, i) => i !== index)
                          });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#C53030',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <textarea
                placeholder="Notes (optional)"
                value={newFriend.notes}
                onChange={(e) => setNewFriend({ ...newFriend, notes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleAddFriend}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: theme.colors.primary,
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Friend
                </button>
                <button
                  onClick={() => {
                    setShowAddFriend(false);
                    setNewFriend({
                      id: '',
                      publicName: '',
                      firstName: '',
                      lastName: '',
                      recoveryGroups: [],
                      connectionDate: new Date().toISOString(),
                      notes: ''
                    });
                    setSelectedGroup('');
                    setRecoveryDate('');
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    background: '#fff',
                    color: theme.colors.dark,
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Friends List */}
          {recoveryFriends.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: '#f0f0f0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={32} color="#ccc" />
              </div>
              <h3 style={{
                fontFamily: theme.fonts.display,
                fontSize: '1.3rem',
                marginBottom: '0.5rem',
                color: theme.colors.dark
              }}>
                No friends yet
              </h3>
              <p style={{
                color: theme.colors.dark,
                opacity: 0.6,
                marginBottom: '1.5rem'
              }}>
                Add recovery friends to support each other's journey
              </p>
              <button
                onClick={() => setShowAddFriend(true)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: theme.colors.warmGradient,
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Your First Friend
              </button>
            </div>
          ) : (
            recoveryFriends.map((friend, index) => (
              <div 
                key={friend.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '20px',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onClick={() => setEditingFriend(friend)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.tertiary})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '1.5rem',
                      marginRight: '1rem',
                      position: 'relative',
                      flexShrink: 0
                    }}>
                      {friend.publicName.charAt(0).toUpperCase()}
                      {friend.recoveryGroups.length > 0 && friend.recoveryGroups.some(g => {
                        const time = getTimeInRecovery(g.recoveryDate);
                        return getMilestoneBadge(time);
                      }) && (
                        <div style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          background: theme.colors.accent,
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          boxShadow: '0 2px 8px rgba(247, 127, 0, 0.4)',
                          border: '2px solid #fff'
                        }}>
                          {(() => {
                            const milestones = friend.recoveryGroups.map(g => {
                              const time = getTimeInRecovery(g.recoveryDate);
                              return getMilestoneBadge(time);
                            }).filter(Boolean);
                            return milestones[0] || '⭐';
                          })()}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                        {friend.publicName}
                      </div>
                      {friend.recoveryGroups.length > 0 && (
                        <div style={{ marginBottom: '0.5rem' }}>
                          {friend.recoveryGroups.map((group, gIndex) => {
                            const programInfo = RECOVERY_GROUPS.find(g => g.id === group.groupId);
                            const timeInRecovery = getTimeInRecovery(group.recoveryDate);
                            const badge = getMilestoneBadge(timeInRecovery);
                            
                            return (
                              <div key={gIndex} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                background: theme.colors.softGradient,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                marginRight: '0.5rem',
                                marginBottom: '0.25rem',
                                fontSize: '0.85rem'
                              }}>
                                <span style={{ marginRight: '0.25rem' }}>
                                  {programInfo?.icon}
                                </span>
                                <span style={{ 
                                  fontWeight: '600',
                                  color: theme.colors.secondary
                                }}>
                                  {timeInRecovery.value} {timeInRecovery.unit}
                                </span>
                                {badge && (
                                  <span style={{ marginLeft: '0.25rem' }}>
                                    {badge}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {friend.notes && (
                        <div style={{ fontSize: '0.9rem', color: theme.colors.dark, opacity: 0.6 }}>
                          {friend.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={20} color="#999" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Edit Friend Screen Component
  const EditFriendScreen = () => {
    const [tempFriend, setTempFriend] = useState({ ...editingFriend });
    const [selectedGroup, setSelectedGroup] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');

    const handleSaveFriend = () => {
      setRecoveryFriends(recoveryFriends.map(f => 
        f.id === tempFriend.id ? tempFriend : f
      ));
      setEditingFriend(null);
    };

    const handleDeleteFriend = () => {
      setRecoveryFriends(recoveryFriends.filter(f => f.id !== editingFriend.id));
      setEditingFriend(null);
    };

    const addRecoveryGroupToFriend = () => {
      if (selectedGroup && recoveryDate) {
        setTempFriend({
          ...tempFriend,
          recoveryGroups: [
            ...(tempFriend.recoveryGroups || []),
            {
              groupId: selectedGroup,
              recoveryDate: recoveryDate,
              isActive: true,
              notes: ''
            }
          ]
        });
        setSelectedGroup('');
        setRecoveryDate('');
      }
    };

    const removeRecoveryGroup = (index) => {
      setTempFriend({
        ...tempFriend,
        recoveryGroups: tempFriend.recoveryGroups.filter((_, i) => i !== index)
      });
    };

    const getTimeInRecovery = (date) => {
      const start = new Date(date);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return { value: diffDays, unit: 'days', milestone: diffDays === 1 || diffDays === 7 || diffDays === 14 };
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return { value: months, unit: months === 1 ? 'month' : 'months', milestone: months % 3 === 0 };
      } else {
        const years = Math.floor(diffDays / 365);
        const remainingMonths = Math.floor((diffDays % 365) / 30);
        if (remainingMonths > 0) {
          return { value: `${years}y ${remainingMonths}m`, unit: '', milestone: remainingMonths === 0 };
        }
        return { value: years, unit: years === 1 ? 'year' : 'years', milestone: true };
      }
    };

    const getMilestoneBadge = (time) => {
      if (time.unit === 'days') {
        if (time.value === 1) return { badge: '🌱', label: 'First Day!' };
        if (time.value === 7) return { badge: '📅', label: 'One Week!' };
        if (time.value === 14) return { badge: '💪', label: 'Two Weeks!' };
        if (time.value === 30) return { badge: '⭐', label: 'One Month!' };
      } else if (time.unit === 'months' || time.unit === 'month') {
        if (time.value === 1) return { badge: '⭐', label: '1 Month!' };
        if (time.value === 3) return { badge: '🏆', label: '3 Months!' };
        if (time.value === 6) return { badge: '🎖️', label: '6 Months!' };
        if (time.value === 9) return { badge: '🌟', label: '9 Months!' };
      } else if (time.unit === 'years' || time.unit === 'year') {
        if (time.value === 1) return { badge: '🎂', label: '1 Year!' };
        if (time.value >= 2) return { badge: '👑', label: `${time.value} Years!` };
      }
      return null;
    };

    // Calculate longest recovery time for main badge
    const getLongestRecovery = () => {
      if (!tempFriend.recoveryGroups || tempFriend.recoveryGroups.length === 0) return null;
      
      let longestDays = 0;
      let longestGroup = null;
      
      tempFriend.recoveryGroups.forEach(group => {
        const start = new Date(group.recoveryDate);
        const now = new Date();
        const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        if (diffDays > longestDays) {
          longestDays = diffDays;
          longestGroup = group;
        }
      });
      
      if (longestGroup) {
        const time = getTimeInRecovery(longestGroup.recoveryDate);
        return getMilestoneBadge(time);
      }
      return null;
    };

    const mainMilestone = getLongestRecovery();

    return (
      <div className="app-container">
        <div className="bg-pattern"></div>
        
        {/* Header */}
        <div style={{
          background: theme.colors.softGradient,
          padding: '1.5rem',
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setEditingFriend(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ←
            </button>
            <h2 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Edit Friend
            </h2>
            <div style={{ width: '40px' }}></div>
          </div>
        </div>

        <div style={{ 
          padding: '1.5rem',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto'
        }}>
          {/* Friend Avatar */}
          <div style={{
            width: '100px',
            height: '100px',
            margin: '2rem auto',
            background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.tertiary})`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '2.5rem',
            boxShadow: '0 20px 40px rgba(21, 101, 192, 0.2)',
            position: 'relative'
          }}>
            {tempFriend.publicName.charAt(0).toUpperCase()}
            {mainMilestone && (
              <div className="celebrate" style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: theme.colors.accent,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(245, 124, 0, 0.4)',
                border: '3px solid #fff'
              }}>
                {mainMilestone.badge}
              </div>
            )}
          </div>

          {/* Milestone Celebration */}
          {mainMilestone && (
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'inline-block',
                background: theme.colors.warmGradient,
                color: '#fff',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.25)'
              }}>
                {mainMilestone.label}
              </div>
            </div>
          )}

          {/* Edit Form */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            borderRadius: '20px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: theme.colors.primary
            }}>
              Friend Information
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: theme.colors.dark,
                opacity: 0.7
              }}>
                Recovery Name
              </label>
              <input
                type="text"
                value={tempFriend.publicName}
                onChange={(e) => setTempFriend({ ...tempFriend, publicName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px solid ' + theme.colors.primary,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: theme.colors.dark,
                  opacity: 0.7
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={tempFriend.firstName || ''}
                  onChange={(e) => setTempFriend({ ...tempFriend, firstName: e.target.value })}
                  placeholder="Optional"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: theme.colors.dark,
                  opacity: 0.7
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={tempFriend.lastName || ''}
                  onChange={(e) => setTempFriend({ ...tempFriend, lastName: e.target.value })}
                  placeholder="Optional"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: theme.colors.dark,
                opacity: 0.7
              }}>
                Notes
              </label>
              <textarea
                value={tempFriend.notes}
                onChange={(e) => setTempFriend({ ...tempFriend, notes: e.target.value })}
                placeholder="Add notes about your friend..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Recovery Programs */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            borderRadius: '20px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontFamily: theme.fonts.display,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: theme.colors.primary
            }}>
              Recovery Programs
            </h3>

            <div style={{
              background: theme.colors.softGradient,
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select a program...</option>
                {RECOVERY_GROUPS.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.icon} {group.name}
                  </option>
                ))}
              </select>
              
              <input
                type="date"
                value={recoveryDate}
                onChange={(e) => setRecoveryDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}
              />
              
              <button
                onClick={addRecoveryGroupToFriend}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: theme.colors.accent,
                  color: theme.colors.dark,
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Program
              </button>
            </div>

            {/* Display Recovery Programs */}
            {tempFriend.recoveryGroups && tempFriend.recoveryGroups.length > 0 && (
              <div>
                {tempFriend.recoveryGroups.map((group, index) => {
                  const programInfo = RECOVERY_GROUPS.find(g => g.id === group.groupId);
                  const timeInRecovery = getTimeInRecovery(group.recoveryDate);
                  const milestone = getMilestoneBadge(timeInRecovery);
                  
                  return (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #fff, #fafafa)',
                      padding: '1rem',
                      borderRadius: '12px',
                      marginBottom: '0.75rem',
                      border: '1px solid #e0e0e0',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                          <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>
                            {programInfo?.icon}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '1rem' }}>
                              {programInfo?.name}
                            </div>
                            <div style={{ 
                              fontSize: '0.9rem', 
                              color: theme.colors.accent,
                              fontWeight: '600',
                              marginTop: '0.25rem'
                            }}>
                              {timeInRecovery.value} {timeInRecovery.unit}
                            </div>
                            <div style={{
                              fontSize: '0.8rem',
                              color: theme.colors.dark,
                              opacity: 0.6,
                              marginTop: '0.25rem'
                            }}>
                              Started: {new Date(group.recoveryDate).toLocaleDateString()}
                            </div>
                          </div>
                          {milestone && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              marginRight: '0.5rem'
                            }}>
                              <span style={{ fontSize: '1.5rem' }}>
                                {milestone.badge}
                              </span>
                              <span style={{
                                fontSize: '0.7rem',
                                color: theme.colors.secondary,
                                fontWeight: '600',
                                marginTop: '0.25rem'
                              }}>
                                Milestone!
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeRecoveryGroup(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#7B1FA2',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            padding: '0.25rem'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(!tempFriend.recoveryGroups || tempFriend.recoveryGroups.length === 0) && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: theme.colors.dark,
                opacity: 0.5
              }}>
                No recovery programs added yet
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={handleSaveFriend}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                background: theme.colors.primary,
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
            
            <button
              onClick={handleDeleteFriend}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid #7B1FA2',
                background: '#fff',
                color: '#7B1FA2',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Remove Friend
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>
      {currentScreen === 'landing' && <LandingScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'friends' && !editingFriend && <FriendsScreen />}
      {editingFriend && <EditFriendScreen />}
    </>
  );
};

export default OTRMilestoneTracker;