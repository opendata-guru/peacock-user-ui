import { shallowMount } from '@vue/test-utils';
import Page404 from '@/components/404-NotFound';

describe('example test', () => {
  it('foo test', () => {
    expect(true).toBeTruthy();
  });

  xit('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Page404, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
