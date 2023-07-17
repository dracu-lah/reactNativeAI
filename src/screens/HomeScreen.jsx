import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import {dummyMessages} from '../constants/constants';
const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1  flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            style={{height: hp(15), width: hp(15)}}
            source={require('../../assets/images/bot.png')}
          />
        </View>
        {/* features || messages */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              style={{fontSize: hp(3)}}
              className="text-gray-600 font-semibold ml-2">
              Assistant
            </Text>
            <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      // image
                      return (
                        <View key={index} className="flex-row justify-start ">
                          <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{uri: message.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60), width: wp(60)}}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                        <View
                          key={index}
                          style={{width: wp(70)}}
                          className="bg-emerald-100  rounded-xl rounded-tl-none p-2">
                          <Text className="text-black">{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // user input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{width: wp(70)}}
                          className="bg-white  rounded-xl p-2 rounded-tr-none">
                          <Text className="text-black">{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        {/* recording, clear and stop buttons */}
        <View className="flex justify-center items-center mb-4">
          <TouchableOpacity>
            {recording ? (
              <Image
                className="rounded-full "
                style={{width: hp(10), height: hp(10)}}
                source={require('../../assets/images/voiceLoading.gif')}
              />
            ) : (
              <Image
                className="rounded-full "
                style={{width: hp(10), height: hp(10)}}
                source={require('../../assets/images/recordingIcon.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
