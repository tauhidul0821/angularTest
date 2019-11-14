import {compute,greet,getCurrencies} from './fundamentals.component';

describe('compute',()=>{
  it('should return 0 if input is negative',()=>{
    const result = compute(-1);
    expect(result).toBe(0);
  });
  
  it('should increment the input if it is positive',()=>{
    const result = greet('Tauhid');
    expect(result).toContain('Tauhid');
  });
  
  it('should return the supported currencies',()=>{
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
});