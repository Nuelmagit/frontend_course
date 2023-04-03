import { shallowMount } from "@vue/test-utils";
import Operation from "@/modules/operation/pages/operation/Operation.vue";

describe("Operation Component", () => {
  let wrapper, forceError;

  const userAlert = jest.fn((title, text, type) => Promise.resolve(true));

  const runOperation = jest.fn((email, password) => forceError ? Promise.reject("Something went wrong") : Promise.resolve(true));


  beforeEach(() => {
    wrapper = shallowMount(Operation, {
      global: {
        provide: {
          "runOperation": runOperation,
          "userAlert": userAlert
        }
      }
    });
    jest.clearAllMocks();
    forceError = false;
  })

  test("Should send the run operation request when the form is submitted.", async () => {
    await wrapper.vm.onFormSubmitted({});

    expect(runOperation).toHaveBeenCalledTimes(1);
  });

  test("Should show an error message when the run operation request fails.", async () => {
    forceError = true;

    await wrapper.vm.onFormSubmitted({});

    expect(userAlert.mock.calls[0][2]).toBe("error");
  });

  test("Should show a success message when the run operation request is completed successfully.", async () => {
    await wrapper.vm.onFormSubmitted({});

    expect(userAlert.mock.calls[0][2]).toBe("success");
  });

})