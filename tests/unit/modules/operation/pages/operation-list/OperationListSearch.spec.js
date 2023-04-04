import { shallowMount } from "@vue/test-utils";
import OperationListSearch from "@/modules/operation/pages/operation-list/OperationListSearch.vue";

describe("OperationListSearch Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OperationListSearch);
  })

  test("Should emit the search value", async () => {
    const searchValue = "hi";
    const input = wrapper.find("input");
    await input.setValue(searchValue);

    await wrapper.find("button").trigger('click');

    const emittedData = wrapper.emitted()["valueChanged"][0][0];
    expect(emittedData).toBe(searchValue);
  });

})