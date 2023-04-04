
import { shallowMount } from "@vue/test-utils";
import OperationList from "@/modules/operation/pages/operation-list/OperationList.vue";

describe("OperationList Component", () => {
  let wrapper, fetchOperationError, deleteOperationError;
  let userConfirmationResponse = true;
  const userConfirmation = jest.fn(() => Promise.resolve(userConfirmationResponse));
  const showNotification = jest.fn(() => Promise.resolve(true));
  const fetchOperationRecords = jest.fn(() => fetchOperationError ? Promise.reject(false) : Promise.resolve(true));
  const deleteOperationRecord = jest.fn(() => deleteOperationError ? Promise.reject(false) : Promise.resolve(true));

  beforeEach(() => {
    fetchOperationError = false;
    deleteOperationError = false;
    userConfirmationResponse = true;
    wrapper = shallowMount(OperationList, {
      global: {
        provide: {
          "userConfirmation": userConfirmation,
          "showNotification": showNotification,
          "fetchOperationRecords": fetchOperationRecords,
          "deleteOperationRecord": deleteOperationRecord,
        }
      }
    });
    jest.clearAllMocks();
  })


  test("Should search the given value when a search action is triggered", async () => {
    const value = "value to search";

    await wrapper.vm.onSearch(value);

    expect(fetchOperationRecords.mock.calls[0][1]).toBe(value);
  });

  test("Should search the given page when the page changes", async () => {
    const page = 10;

    await wrapper.vm.onPageChanged(page);

    expect(fetchOperationRecords.mock.calls[0][0]).toBe(page);
  });

  test("Should sort data when sorting changes", async () => {
    const sortField = "date";
    const sortCriteria = "asc"

    await wrapper.vm.onSorted({ sortField, sortCriteria });

    expect(fetchOperationRecords.mock.calls[0][2]).toBe(sortField);
    expect(fetchOperationRecords.mock.calls[0][3]).toBe(sortCriteria);
  });

  test("Should alert the user when pagination fails", async () => {
    fetchOperationError = true

    await wrapper.vm.refreshTable();

    expect(showNotification.mock.calls[0][0]).toBe("error");
  });

  test("Should show a success notification and refresh the table when an operation record is deleted successfully", async () => {
    wrapper.vm.refreshTable = jest.fn();

    await wrapper.vm.deleteItem(1);

    expect(deleteOperationRecord).toHaveBeenCalled();
    expect(wrapper.vm.refreshTable).toHaveBeenCalled();

    expect(showNotification.mock.calls[0][0]).toBe("success");

  });

  test("Should shown an error notification and DONT refresh the table when the request to delete an operation record fails", async () => {
    deleteOperationError = true;
    wrapper.vm.refreshTable = jest.fn();

    await wrapper.vm.deleteItem(1);

    expect(deleteOperationRecord).toHaveBeenCalled();
    expect(wrapper.vm.refreshTable).not.toHaveBeenCalled();
    expect(showNotification.mock.calls[0][0]).toBe("error");
  });

  test("Should delete the operation record if the user confirms", async () => {
    wrapper.vm.deleteItem = jest.fn();

    await wrapper.vm.confirmDelete(1);

    expect(wrapper.vm.deleteItem).toHaveBeenCalled();
    expect(userConfirmation).toHaveBeenCalled()
  });

  test("Should NOT delete the operation record if the user DON'T confirms", async () => {
    userConfirmationResponse = false;
    wrapper.vm.deleteItem = jest.fn();

    await wrapper.vm.confirmDelete(1);

    expect(wrapper.vm.deleteItem).not.toHaveBeenCalled();
    expect(userConfirmation).toHaveBeenCalled();
  });

  test("Should sort data when sorting changes", async () => {
    const sortField = "date";
    const sortCriteria = "asc"

    await wrapper.vm.onSorted({ sortField, sortCriteria });

    expect(fetchOperationRecords.mock.calls[0][2]).toBe(sortField);
    expect(fetchOperationRecords.mock.calls[0][3]).toBe(sortCriteria);
  });

  test("Should change per page limit", async () => {
    const perPageOption = wrapper.vm.perPageOptions.length - 1;

    const input = wrapper.find("select");
    await input.setValue(wrapper.vm.perPageOptions[perPageOption]);

    expect(fetchOperationRecords.mock.calls[0][4]).toBe(wrapper.vm.perPageOptions[perPageOption]);
  });

})