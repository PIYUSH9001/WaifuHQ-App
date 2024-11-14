import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const WaveringPlaceholder = ({ width = 200, height = 20, borderRadius = 5 }) => {
  // Create an animated value
  const animation = useRef(new Animated.Value(1)).current;

  // Define the animation effect
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0.8,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  return (
    <Animated.View
      style={[
        styles.placeholder,
        {
          width,
          height,
          borderRadius,
          opacity: animation,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#e0e0e0',
    // marginBottom: 10,
    margin:10,
  },
});

export default WaveringPlaceholder;
