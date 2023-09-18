import React from "react";
import { View, Pressable, Text} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import {AiFillFileImage} from "react-icons/ai"

export default function Article() {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex justify-center items-center")}>
      <Text style={tailwind("mt-[70px] mb-[10px] text-lg")}>TITRE BROOOOOOOOOOOOOOOOO</Text>
      <Pressable onPress={() => navigation.navigate("Messagerie")}>
        <AiFillFileImage style={{width:"350px",height:"200px"}}/>
      </Pressable>
      <Text style={tailwind("mt-[20px] w-[90%] text-sm")}>
        Une exoplanète et une formidable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant la beauté et
        l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi une nouvelle image
        spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les étoiles naissantes jaillissant
        de leur cocon de poussière idable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant la beauté et
        l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi une nouvelle image
        spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les étoiles naissantes jaillissant
        de leur cocon de poussière.
      </Text>
    </View>
  );
}
