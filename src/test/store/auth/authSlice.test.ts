import {} from "@testing-library/react";
import { authSlice, login, logout } from "../../../store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/auxFixtures";

describe("Pruebas en authSlice", () => {
  test("debe de regresar el estado inicial y llamarse 'auth'", async () => {
    expect(authSlice.name).toBe("auth");

    const state = authSlice.reducer(initialState,{
        type: undefined
    });

    expect(state).toEqual(initialState);

  });


  test('Debe realizar la autenticación', () => { 

     const state = authSlice.reducer(initialState, login(demoUser));

     expect(state.uid).toBe(demoUser.uid);

   })

   test('Debe realizar el logout sin argumentos', () => { 

    const state = authSlice.reducer(authenticatedState, logout());

    expect(state.status).toBe('not-authenticated');

  })

  test('Debe realizar el logout con argumentos', () => { 

    const state = authSlice.reducer(authenticatedState, logout('Error en logout'));

    expect(state.errorMessage).toBe('Error en logout');

  })


});
