import React from "react";
import { View, Pressable, Text, ScrollView, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";

export default function Article() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex flex-col`}>
      <ScrollView>
        <Text style={tw`mx-auto text-xl mt-16`}>TITRE BROOOOOOOOOOOOOOOOO</Text>
        <Pressable onPress={() => navigation.navigate("Detail")} style={tw`mx-auto`}>
          <Entypo name="image-inverted" size={220} color="black" />
        </Pressable>
        <Text style={tw`ml-2 w-[90%] text-base pr-2 pb-5`}>
          Une exoplanète et une formidable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant la beauté et
          l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi une nouvelle image
          spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les étoiles naissantes jaillissant
          de leur cocon de poussière idable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant la beauté et
          l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi une nouvelle image
          spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les étoiles naissantes jaillissant
          de leur cocon de poussière.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
