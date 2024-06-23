import { Component } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.css';

interface PhoneInputGfgState {
  phone: string;
}

class PhoneInputField extends Component<{}, PhoneInputGfgState> {
  constructor(props: {}) {
    super(props);
    this.state = { phone: '' };
  }

  render() {
    const customSearchStyle = {
      width: '100%',
      height: '2rem',
      margin: '0',
      padding: '0.5rem',
    };

    const customContainerStyle = {
      border: 'none',
      borderRadius: '5px',
    };

    const customInputStyle = {
      width: '100%',
      height: '2.5rem',
      //   fontSize: '16px',
      //   border: '1px solid #8FA2B2',
      //   //   borderRadius: '5px',
      //   fontWeight: '300',
      //   outline: 'none',
      //   transition: 'box-shadow 0.2s',
    };

    // const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    //   //   e.target.style.boxShadow = '0 0 0 2px #000'; // Adjust color as needed
    // };

    // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //   //   e.target.style.boxShadow = 'none';
    // };

    return (
      <div className="w-full relative">
        <PhoneInput
          country={'np'}
          value={this.state.phone}
          onChange={(phone: string) => this.setState({ phone })}
          containerStyle={customContainerStyle}
          inputStyle={customInputStyle}
          inputClass="!px-2 border border-custom-gray-light !rounded placeholder:font-light outline-none focus-visible:ring-2"
          //   onFocus={handleFocus}
          //   onBlur={handleBlur}
          dropdownClass="static w-full"
          enableSearch={true}
          searchClass=""
          searchStyle={customSearchStyle}
        />
      </div>
    );
  }
}

export default PhoneInputField;
