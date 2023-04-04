import { shallowMount } from "@vue/test-utils";
import OperationLayout from "@/modules/operation/layouts/OperationLayout.vue";
import { router } from "@/router/router"

describe("OperationLayout Component", () => {
  let wrapper, signInError, userServiceSpy;

  const showNotification = jest.fn((type, text) => Promise.resolve(true));

  const userService = {
    signOut: () => Promise.resolve(true)
  }

  beforeEach(() => {
    wrapper = shallowMount(OperationLayout, {
      global: {
        plugins: [router],
        provide: {
          "userService": userService,
          "showNotification": showNotification
        }
      }
    });
    userServiceSpy = jest.spyOn(userService, 'signOut');
    jest.clearAllMocks();
    signInError = false;
  })

  test("Should sign out.", async () => {
    await wrapper.vm.signOut();

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
  });


  test("Should show a success message when signing out.", async () => {
    await wrapper.vm.signOut({ email: "a@a.com", password: "abc123" });

    expect(showNotification.mock.calls[0][0]).toBe("success");
  });

})