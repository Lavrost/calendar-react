import {EventActionEnum, setEventsAction, setGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";


export const EventActionCreators = {
    setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'; // TODO: повторение кода(см ниже), вынести
            const jsonEvents = JSON.parse(events) as IEvent[];
            jsonEvents.push(event);
            dispatch(EventActionCreators.setEvents(jsonEvents));
            localStorage.setItem("events", JSON.stringify(jsonEvents));
        } catch (e) {
            console.log(e);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch)=> {
        try {
            const events = localStorage.getItem("events") || '[]';
            const jsonEvents = JSON.parse(events) as IEvent[];
            const currentUserEvents = jsonEvents.filter(
                ev => ev.author === username || ev.guest === username
            );
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e) {
            console.log(e);
        }
    }
};