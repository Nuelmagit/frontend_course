import { shallowMount } from "@vue/test-utils";
import Login from "@/modules/outside/pages/Login.vue";

describe("Login Component", () => {
  let wrapper, signInError, userServiceSpy;

  const showNotification = jest.fn((type, text) => Promise.resolve(true));

  const userService = {
    signIn: (email, password) => signInError ? Promise.reject("Something went wrong") : Promise.resolve(true)
  }

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      global: {
        provide: {
          "userService": userService,
          "showNotification": showNotification
        }
      }
    });
    userServiceSpy = jest.spyOn(userService, 'signIn');
    jest.clearAllMocks();
    signInError = false;
  })

  test("Should send the login request when the form is submitted.", async () => {
    await wrapper.vm.onFormSubmitted({ email: "a@a.com", password: "abc123" });

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
  });

  test("Should show an error message when sign in fails.", async () => {
    signInError = true;

    await wrapper.vm.onFormSubmitted({ email: "a@a.com", password: "abc123" });

    expect(showNotification.mock.calls[0][0]).toBe("error");
  });

  test("Should show a success message when sign in successfully.", async () => {
    await wrapper.vm.onFormSubmitted({ email: "a@a.com", password: "abc123" });

    expect(showNotification.mock.calls[0][0]).toBe("success");
  });

})