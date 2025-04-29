import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { request, PERMISSIONS, openSettings, check, RESULTS } from 'react-native-permissions';

const PermissionsScreen = () => {

    const askForPermissions = async (permission) => {
        try {
            const current = await check(permission);

            if (current === RESULTS.BLOCKED) {
                console.log('Permission is blocked. Opening settings...');
                openSettings().catch(() => {
                    console.warn('Cannot open settings');
                });
            } else {
                const result = await request(permission);
                console.log(`${permission} result:`, result);

                if (result === RESULTS.GRANTED) {
                    console.log('Permission granted!');
                } else {
                    console.log('Permission not granted.');
                }
            }
        } catch (err) {
            console.error('Permission error:', err);
        }
    };


    return (
        <View style={{ padding: 10 }}>
            {/* Camera Permission */}
            <TouchableOpacity
                style={buttonStyle}
                onPress={() => {
                    if (Platform.OS === 'android') {
                        askForPermissions(PERMISSIONS.ANDROID.CAMERA);
                    }
                }}
            >
                <Text>Camera Permission</Text>
            </TouchableOpacity>

            {/* Image Permission */}
            <TouchableOpacity
                style={buttonStyle}
                onPress={() => {
                    if (Platform.OS === 'android') {
                        askForPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES); // For Android 13+
                        // askForPermissions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE); // For Android < 13
                    }
                }}
            >
                <Text>Image Permission</Text>
            </TouchableOpacity>

            {/* Contacts Permission */}
            <TouchableOpacity
                style={buttonStyle}
                onPress={() => {
                    if (Platform.OS === 'android') {
                        askForPermissions(PERMISSIONS.ANDROID.READ_CONTACTS);
                    }
                }}
            >
                <Text>Contact Permission</Text>
            </TouchableOpacity>
        </View>
    );
};

const buttonStyle = {
    width: '90%',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'center',
};

export default PermissionsScreen;
