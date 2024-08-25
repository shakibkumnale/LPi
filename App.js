import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  Button} from 'react-native';
import Home from './screens/Home';
import Camera from './screens/camera';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Chats from './screens/chat';
import Future from './screens/feuture';
import { FontAwesome } from '@expo/vector-icons';
import CameraButton from './screens/Button';
import BackButton from './screens/ChatButton';
import Demo from './screens/demo';
import { useState } from 'react';


const Tab = createBottomTabNavigator();

export default function App() {
  const [sharedState, setSharedState] = useState(true);
  return (
    // <View>
    <NavigationContainer>
      <Tab.Navigator
            initialRouteName="Chat" // Set Home as the default tab
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Camera') {
                  iconName = focused ? 'camera' : 'camera-outline';
                }
                else if (route.name === 'future') {
                  iconName = focused ? 'git-compare' : 'git-compare-outline';
                }
                else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                }
                
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;                            
              },
              tabBarShowLabel: false, // Hides the label
            })}
            tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
            }}
            >
       
    
        <Tab.Screen name="future" component={Demo} />
        <Tab.Screen name="HOME" component={Home} />

        <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarButton: (props) => (
            <CameraButton {...props} sharedState={sharedState} setSharedState={setSharedState}>
              <FontAwesome name="camera" size={30} color="#fff" />
            </CameraButton>
          ),
        }}
        />
    
        <Tab.Screen name="Chat" component={Chats}  options={{
          headerTitle:()=><BackButton/>,
          headerRight:()=><Text style={{
            fontWeight:'bold',
            fontSize:20,
            marginRight:40
          }}>Chat</Text>,
          tabBarStyle: { display: 'none' }, // Hide the tab bar on the Camera screen
          
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    
        // </View>
  );
}

