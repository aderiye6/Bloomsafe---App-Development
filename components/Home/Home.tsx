import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BLOOM_GREEN } from '../../constants';
import Button from '../Button/Button';
import UsageStep from './UsageStep/UsageStep';

interface Props {
  openCamera: () => void;
}

const useageSteps = [
  {
    step: 1,
    text: 'Fold sample channel back to keep out of way.',
    image: require('../../assets/images/Picture1.png'),
  },
  {
    step: 2,
    text: 'Dip channel up to white line in sample water, hold for 90 seconds.',
    image: require('../../assets/images/Picture2.png'),

  },
  {
    step: 3,
    text: 'Fold control channel back to keep out of way.',
    image: require('../../assets/images/Picture3.png'),

  },
  {
    step: 4,
    text: 'Dip channel up to white line in sample water, hold for 90 seconds.',
    image: require('../../assets/images/Picture4.png'),

  },
  {
    step: 5,
    text: 'Wait for 3 minutes then take picture with app.',
    image: require('../../assets/images/Picture5.png'),

  },
];

const Home: React.FC<Props> = ({ openCamera }) => {
  const [stepTaken, setstepTaken] = useState<number>(0)
  const handleNext =()=>{
    if(stepTaken===4){
      openCamera()
    }else{
      setstepTaken((p:number)=> p+1)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
     {stepTaken+1}.  {
        useageSteps[stepTaken]?.text
       }
      </Text>
      <View style={styles.steps}>
      <Image source={ useageSteps[stepTaken]?.image} style={styles.image} />
      </View>

      <Button text='Next' onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
   paddingTop:20
  },
  header: {
    fontSize: 13,
    paddingTop:20,
    fontWeight: '500',
    color: "black",
    textTransform: 'capitalize',
  },
  steps: {
   flex:1
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'contain'
  }
});

export default Home;
