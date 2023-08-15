import { appActions, appReducer, RequestStatusType } from "./app-reducer";

const initialState = {
	status: "idle" as RequestStatusType,
	error: null as string | null,
	isInitialized: false
};
type InitialStateType = typeof initialState
let startState: InitialStateType;

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle',
		isInitialized: false
	}
})

test('correct error message should be set', () => {
	const endState = appReducer(startState, appActions.setAppError({error:'some error'}))
	expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
	const endState = appReducer(startState, appActions.setAppStatus({status: "loading" }))
	expect(endState.status).toBe('loading');
})

