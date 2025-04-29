import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const LoginPage = () => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '474010202828-tkubeovl5edjghtfrs6ie5e2gp41n6gm.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);

    const signIn = async () => {
        try {
            // Check if Google Play Services are available
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

            // Perform the sign-in flow
            const usrInfo = await GoogleSignin.signIn();
            console.log('User Info:', usrInfo);  // Google user info including email, idToken, etc.
            setUserInfo(usrInfo)

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing in...');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Signing in...');
            } else {
                console.error('Google Sign-In error:', error);
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            console.log('User signed out');
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <View>
            <Text>Hii</Text>
            {userInfo ? (
                <>
                    <Text style={styles.text}>Welcome, {userInfo?.user?.name}</Text>
                    <Text style={styles.text}>{userInfo?.user?.email}</Text>
                    <Button title="Sign Out" onPress={signOut} />
                </>
            ) : (
                <TouchableOpacity
                    style={{ padding: 20, borderWidth: 1 }}
                    onPress={signIn}
                >
                    <Text style={styles.buttonText}>Sign in </Text>
                </TouchableOpacity>
            )}
        </View>
    )
};

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 4,
        backgroundColor: '#ffffff',
        borderColor: '#E5E5E5',
        fontSize: 14,
        lineHeight: 18.2,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: '#19213D'
    },

    button: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        height: 50,
        backgroundColor: '#4563E4',
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 30
    },

    buttonText: {
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 20
    },

});

export default LoginPage