import { shallowMount } from "@vue/test-utils";
import OperationListTable from "@/modules/operation/pages/operation-list/OperationListTable.vue";

describe("OperationListTable Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OperationListTable, {
      attachTo: document.body
    });

    jest.clearAllMocks();
  })


  test("Should emit the sorted column an criteria when clicking on a column", async () => {
    await wrapper.findAll("th")[0].trigger('click');

    const emittedData = wrapper.emitted()["sorted"][0][0];

    expect(emittedData.sortField).toBe(wrapper.vm.columns[0].id);
    expect(["asc", "desc"].includes(emittedData.sortCriteria)).toBeTruthy()
  });

  test("Should emit the delete action when clicking on delete button", async () => {
    const item = {
      _id: "1",
      operationType: "addition",
      cost: "1",
      date: "today",
      operationResult: "40",
      balanceAfterOperation: "100"
    };
    await wrapper.setProps({
      items: [item]
    })

    await wrapper.find("button").trigger('click');

    const emittedData = wrapper.emitted()["delete"][0][0];
    expect(emittedData).toBe(item._id);

  });

})