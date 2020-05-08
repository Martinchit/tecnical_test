import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from 'react-bootstrap';

import { StockListPagination } from '../StockListPagination';

describe('Alert', () => {
  const props = {
    currentPage: 1,
    totalPages: 10,
    onPaginationButtonClickHandler: jest.fn(),
  };

  const restoreMock = () => {
    props.onPaginationButtonClickHandler.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<StockListPagination {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onPaginationButtonClickHandler', () => {
    const wrapper = shallow(<StockListPagination {...props} />);
    wrapper.find(Pagination.First).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(1);
    wrapper.find(Pagination.Last).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledTimes(2);
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(
      props.totalPages
    );
    restoreMock();
  });

  it('renders Pagination.Ellipsis', () => {
    const currentPage = 4;
    const wrapper = shallow(
      <StockListPagination
        totalPages={props.totalPages}
        onPaginationButtonClickHandler={props.onPaginationButtonClickHandler}
        currentPage={currentPage}
      />
    );
    expect(wrapper.find(Pagination.Ellipsis).length).toBe(2);
    wrapper.find(Pagination.Ellipsis).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(1);
    restoreMock();
    wrapper.find(Pagination.Item).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(1);
    restoreMock();
    wrapper.find(Pagination.Ellipsis).last().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(4 + 5);
    restoreMock();
    wrapper.find(Pagination.Item).last().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(
      props.totalPages
    );
    restoreMock();
  });

  it('renders correctly with less than 5 pages', () => {
    const totalPages = 3;
    const wrapper = shallow(
      <StockListPagination
        totalPages={totalPages}
        onPaginationButtonClickHandler={props.onPaginationButtonClickHandler}
        currentPage={props.currentPage}
      />
    );
    expect(wrapper.find(Pagination.Item).length).toBe(totalPages);
    wrapper.find(Pagination.Item).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(1);
    restoreMock();
    wrapper.find(Pagination.Item).at(1).simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(2);
    restoreMock();
    wrapper.find(Pagination.Item).at(2).simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(3);
    restoreMock();
  });

  it('renders correctly with more than 5 pages', () => {
    const totalPages = 10;
    const currentPage = 5;
    const wrapper = shallow(
      <StockListPagination
        totalPages={totalPages}
        onPaginationButtonClickHandler={props.onPaginationButtonClickHandler}
        currentPage={currentPage}
      />
    );
    expect(wrapper.find(Pagination.Item).length).toBe(7);
    wrapper.find(Pagination.Item).at(1).simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(3);
    restoreMock();
    wrapper.find(Pagination.Item).at(2).simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(4);
    restoreMock();
    wrapper.find(Pagination.Ellipsis).first().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(1);
    restoreMock();
    wrapper.find(Pagination.Ellipsis).last().simulate('click');
    expect(props.onPaginationButtonClickHandler).toHaveBeenCalledWith(10);
    restoreMock();
  });
});
