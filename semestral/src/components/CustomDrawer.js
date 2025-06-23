import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const CustomDrawer = (props) => {
  const { navigation } = props;
  const [activeItem, setActiveItem] = useState(null);
  const [scaleValue] = useState(new Animated.Value(1));

  const menuItems = [
    {
      name: 'Início',
      icon: require('../../assets/home-icon.png'),
      route: 'Início',
      useImage: true,
      ionIcon: 'home-outline',
    },
    {
      name: 'Cursos Presenciais',
      icon: require('../../assets/cursos-icon.png'),
      route: 'Cursos',
      useImage: true,
      ionIcon: 'book-outline',
    },
    {
      name: 'Instrutores',
      icon: require('../../assets/instrutor-icon.png'),
      route: 'Instructors',
      useImage: true,
      ionIcon: 'people-outline',
    },
    {
      name: 'Perfil',
      icon: require('../../assets/perfil-icon.png'),
      route: 'Profile',
      useImage: true,
      ionIcon: 'person-outline',
    },
  ];

  const handleNavigation = (route, index) => {
    setActiveItem(index);

    // Animation on press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.navigate(route);
      navigation.closeDrawer();
      setActiveItem(null);
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0a1929', '#1a2332', '#0f1419']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Drawer Content */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            {/* Logo Container with Glow Effect */}
            <View style={styles.logoContainer}>
              <View style={styles.logoGlow}>
                <Image
                  source={require('../../assets/logo-small.png')}
                  style={styles.logo}
                />
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  activeItem === index && {
                    transform: [{ scale: scaleValue }]
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    activeItem === index && styles.menuItemActive
                  ]}
                  onPress={() => handleNavigation(item.route, index)}
                  activeOpacity={0.9}
                >
                  {/* Menu Item Background with Blur */}
                  <BlurView intensity={20} style={styles.menuItemBackground}>
                    <LinearGradient
                      colors={
                        activeItem === index
                          ? ['rgba(100, 181, 246, 0.2)', 'rgba(100, 181, 246, 0.1)']
                          : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                      }
                      style={styles.menuItemGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  </BlurView>

                  {/* Icon Container */}
                  <View style={[
                    styles.iconContainer,
                    activeItem === index && styles.iconContainerActive
                  ]}>
                    {item.useImage ? (
                      <Image source={item.icon} style={[
                        styles.menuIconImage,
                        activeItem === index && styles.menuIconActive
                      ]} />
                    ) : (
                      <Ionicons
                        name={item.ionIcon}
                        size={22}
                        color={activeItem === index ? "#FFFFFF" : "#64B5F6"}
                        style={styles.menuIcon}
                      />
                    )}
                  </View>

                  {/* Text */}
                  <Text style={[
                    styles.menuText,
                    activeItem === index && styles.menuTextActive
                  ]}>{item.name}</Text>

                  {/* Arrow Indicator */}
                  <View style={styles.arrowContainer}>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={activeItem === index ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)"}
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <View style={styles.footerDivider} />
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="settings-outline"
                  size={22}
                  color="#64B5F6"
                />
              </View>
              <Text style={styles.settingsText}>Configurações</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGlow: {
    shadowColor: '#64B5F6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuSection: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItemActive: {
    shadowColor: '#64B5F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  menuItemBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 16,
  },
  menuItemGradient: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(100, 181, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(100, 181, 246, 0.3)',
    shadowColor: '#64B5F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  menuIcon: {
    // Styles already applied in component
  },
  menuIconImage: {
    width: 20,
    height: 20,
    tintColor: '#64B5F6',
  },
  menuIconActive: {
    tintColor: '#FFFFFF',
  },
  menuText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  menuTextActive: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  arrowContainer: {
    opacity: 0.6,
  },
  footerSection: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingsText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});

export default CustomDrawer;
