import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import { Pressable, View, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { checkAuthentication } from '../../services/authService';  // Import your authentication function
import LoginScreen from '.././LoginScreen';  // Import the Login screen
 
// Icon component
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await checkAuthentication();  // Custom logic to check authentication
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  // If the authentication state is null (loading), show a loading spinner
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View>
    );
  }

  // If the user is not authenticated, render the LoginScreen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // If the user is authenticated, render the Tabs component
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />
    </Tabs>
  );
}
