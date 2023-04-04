import { shallowMount } from "@vue/test-utils";
import OperationForm from "@/modules/operation/pages/operation/OperationForm.vue";

describe("OperationForm Component", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(OperationForm, {
      attachTo: document.body
    });

    jest.clearAllMocks();
  })

  test("Should call the formSubmit function when the submit button is clicked", async () => {
    wrapper.vm.onFormSubmit = jest.fn();

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.onFormSubmit).toHaveBeenCalled();
  });

  test("Should emit the form data when formSubmit function is triggered", async () => {
    const firstValue = 3;
    const secondValue = 4;
    const input = wrapper.findAll("input");
    await input[0].setValue(firstValue);
    await input[1].setValue(secondValue);

    wrapper.vm.onFormSubmit()

    const emittedData = wrapper.emitted()["formSubmitted"][0][0];
    expect(emittedData.values[0]).toBe(firstValue);
    expect(emittedData.values[1]).toBe(secondValue);
  });
  
  test("Should trigger the form clear function when the clear button is clicked", async () => {
    wrapper.vm.clear = jest.fn();

    await wrapper.findAll('button')[1].trigger('click');

    expect(wrapper.vm.clear).toHaveBeenCalled();
  });

  test("Should clear the form when the clear function is invoked", async () => {
    wrapper.setData({ firstValue: 56, secondValue: 5 });

    await wrapper.vm.clear();

    expect(wrapper.vm.firstValue).toBeUndefined();
    expect(wrapper.vm.secondValue).toBeUndefined();
  });
  
})