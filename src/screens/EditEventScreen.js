import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as Yup from 'yup';

import { 
    Screen, 
    AppForm,
    AppFormField,
    AppFormBox,
    KeyboardView,
    SubmitButton
} from '../components';
import { editEvent } from '../utils/api_handler';

const validationSchema = Yup.object().shape({
    eventTitle: Yup.string(),
    eventOrganizer: Yup.string(),
    eventDate: Yup.date(),
    eventDescription: Yup.string(),
})

function EditEventScreen(props) {

    const event = props.route.params.event;
    const id = event.id;
    const title = event.data.eventTitle;
    const organizer = event.data.eventOrganizer;
    const date = event.data.eventDate;
    const description = event.data.eventDescription;

    async function handleSubmit(values) {
        values["id"] = id;
        await editEvent(values);
        props.navigation.navigate("Event")
    }

    return (
        <Screen>
            <KeyboardView>
                <ScrollView>
                    <AppForm
                        initialValues={{
                            eventTitle: title,
                            eventOrganizer: organizer,
                            eventDate: date,
                            eventDescription: description
                        }}
                        onSubmit={values => handleSubmit(values)}
                        validationSchema={validationSchema}
                        >
                        <View style={styles.container}>
                            <AppFormField
                                name="eventTitle"
                                placeholder={title}
                            />
                            <AppFormField
                                name="eventOrganizer"
                                placeholder={organizer}
                            />
                            <AppFormField
                                name="eventDate"
                                placeholder={date}
                            />
                            <AppFormBox
                                name="eventDescription"
                                blurOnSubmit={false}
                                placeholder={description}
                            />
                            <SubmitButton title="Submit"/>
                        </View>
                    </AppForm>
                </ScrollView>
            </KeyboardView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%'
    }
})

export default EditEventScreen;