import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
// import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomBotton from "../../components/CustomButton";
// import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const SignIn = () => {
  const colorScheme = useColorScheme();
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const submit = async () => {
  //   if (form.email === "" || form.password === "") {
  //     Alert.alert("Error", "Please fill in all fields");
  //   }

  //   setIsSubmitting(true);
  //   try {
  //      await signIn(form.email, form.password);
  //     const result = await getCurrentUser();
  //     setUser(result);
  //     setIsLogged(true);

  //     // Alert.alert("Success", "User signed in successfully");
  //     router.replace("/home");
  //   } catch (error) {
  //     Alert.alert("Error:(", error.message);
  //     console.error("this is the error")
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor:  colorScheme === "dark" ? "#000" : "#fff",
      }}
      // className="bg-primary"
    >
      <ScrollView>
        <View
          // className="w-full flex justify-center min-h-[85vh] px-4 my-6"
          style={{
            // minHeight: Dimensions.get("window").height - 100,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
            minHeight: "85vh",
          }}
        >
          <Image
            source={require("@/assets/images/malhiblogo.png")}
            resizeMode="contain"
            // className="w-[115px] h-[34px]"
            style={{
              width: 150,
              height: 104,
            }}
          />

          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "semibold",
              color: colorScheme === "dark" ? "#fff" : "black",
              marginTop: 20,
              fontFamily: "Poppins-SemiBold",
            }}
            // className="text-2xl font-semibold text-white mt-10 font-psemibold"
          >
            Log in to Yason
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomBotton
            title="Sign In"
            // handlePress={submit}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View 
          // className="flex justify-center pt-5 flex-row gap-2"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
              gap: 10,
            }}
            >
            <Text 
            style={{
              fontSize: 20,
              color: colorScheme === "dark" ? "#fff" : "black",
              fontFamily: "Poppins-Regular",
            }}
            // className="text-lg text-gray-100 font-pregular"
            >
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={{
                fontSize: 20,
                color: "#7E0201",
                fontFamily: "Poppins-SemiBold",
              }}
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
