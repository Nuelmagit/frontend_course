import { shallowMount } from "@vue/test-utils";
import OperationListPaginator from "@/modules/operation/pages/operation-list/OperationListPaginator.vue";

describe("OperationListPaginator Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OperationListPaginator);
  })

  test("Should increase currentPage in 1 when called", async () => {
    const page = 5;
    await wrapper.setData({ currentPage: page });
    await wrapper.setProps({ totalPages: 10 });
    await wrapper.vm.next();

    expect(wrapper.vm.currentPage).toBe(page + 1);
  });

  test("Should decrease currentPage in 1 when called", async () => {
    const page = 5;
    await wrapper.setData({ currentPage: page });
    await wrapper.setProps({ totalPages: 10 });

    await wrapper.vm.previous();

    expect(wrapper.vm.currentPage).toBe(page - 1);
  });

  test("Should set the page when called", async () => {
    const page = 5;

    await wrapper.vm.onPageClick(page);

    expect(wrapper.vm.currentPage).toBe(page);
  });

  test("Should trigger the next function when the next button is clicked", async () => {
    wrapper.vm.next = jest.fn();

    await wrapper.findAll('li')[2].trigger('click');

    expect(wrapper.vm.next).toHaveBeenCalled();
  });

  test("Should trigger the set page function when a set page button is clicked", async () => {
    wrapper.vm.onPageClick = jest.fn();

    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.vm.onPageClick).toHaveBeenCalled();
  });

  test("Should trigger the previous function when the previous button is clicked", async () => {
    wrapper.vm.previous = jest.fn();

    await wrapper.findAll('li')[0].trigger('click');

    expect(wrapper.vm.previous).toHaveBeenCalled();
  });

})