import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/modules/outside/pages/LoginForm.vue";

describe("LoginForm Component", () => {
  let wrapper, signInError;

  beforeEach(() => {
    wrapper = shallowMount(LoginForm, {
      attachTo: document.body
    });

    jest.clearAllMocks();
    signInError = false;
  })

  test("Should call the formSubmit function when the submit button is clicked", async () => {
    wrapper.vm.formSubmit = jest.fn();

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.formSubmit).toHaveBeenCalled();
  });

  test("Should emit the form data when formSubmit function is triggered", async () => {
    const username = "test@test.com";
    const password = "password";
    const input = wrapper.findAll("input");
    await input[0].setValue(username);
    await input[1].setValue(password);

    wrapper.vm.formSubmit()

    const emittedData = wrapper.emitted()["formSubmitted"][0][0];
    expect(emittedData.email).toBe(username);
    expect(emittedData.password).toBe(password);
  });

})