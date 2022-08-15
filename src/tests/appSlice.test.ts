import appReducer, {initializeApp, initializeAppTC, logOutTC, setAppStatus} from '../store/appSlice'


test('login should be successful', () => {
    const startState = {
        isInitialized: false,
        isAuth: false,
        status: 'idle',
        error: null,
    }
    const endState = appReducer(startState, initializeAppTC.fulfilled({isAuth: true}, ''))
    expect(endState.isAuth).toBe(true)
})

test('logout should be successful', ()=>{
    const startState = {
        isInitialized: true,
        isAuth: true,
        status: 'idle',
        error: null,
    }
    const endState = appReducer(startState, logOutTC.fulfilled({isAuth: false},''))
    expect(endState.isAuth).toBe(false)
})

test('initialize app should be successful', ()=>{
    const startState = {
        isInitialized: false,
        isAuth: false,
        status: 'idle',
        error: null,
    }
    const endState = appReducer(startState, initializeApp())
    expect(endState.isInitialized).toBe(true)
})

test('App status should be changed correct', ()=>{
    const startState = {
        isInitialized: false,
        isAuth: false,
        status: 'idle',
        error: null,
    }
    const endState = appReducer(startState, setAppStatus({status: "loading"}))
    expect(endState.status).toBe("loading")
})