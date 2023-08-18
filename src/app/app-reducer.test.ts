import { appActions, appSlice, RequestStatusType, ThemeType } from "app/app.slice";

const initialStateApp = {
	status: "idle" as RequestStatusType,
	error: null as string | null,
	isInitialized: false,
	theme: 'light' as ThemeType,
};
type InitialStateType = typeof initialStateApp
let startState: InitialStateType;

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle',
		isInitialized: false,
		theme: 'light'
	}
})

test('correct error message should be set', () => {
	const endState = appSlice(startState, appActions.setAppError({error:'some error'}))
	expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
	const endState = appSlice(startState, appActions.setAppStatus({status: "loading" }))
	expect(endState.status).toBe('loading');
})

