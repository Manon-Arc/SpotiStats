import React from "react";
import { Text, StyleSheet } from "react-native";
import { Loader } from "@components/Loader";
import { useGetRecentlyPlayedTracks } from "@hooks/useGetRecentlyPlayedTracks";
import { theme, } from "~/theme";
import { useGetAllGenres } from "@hooks/useGetAllGenresUser";
import { View } from "moti";
import UserStatGenreBloc from "~/components/UserStatGenreBloc";

interface UserStatScreenProps {
    isLoading: boolean;
}

export default function UserStatScreen({ isLoading }: UserStatScreenProps) {
    const { mediumTermGenresUser } = useGetAllGenres();

    return isLoading ? (
        <View style={styles.loaderContainer}>
            <Loader />
        </View>
    ) : (
        <UserStatGenreBloc
            genres={mediumTermGenresUser}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: theme.colors.grey,
        padding: 15,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    sectionDesc: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.greyBright,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.grey,
    },
});
