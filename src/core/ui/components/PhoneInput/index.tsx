import { Component } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.css';

interface PhoneInputGfgState {
  phone: string;
}

interface PhoneInputGfgProps {
  onChange: (phone: string) => void;
}

class PhoneInputField extends Component<
  PhoneInputGfgProps,
  PhoneInputGfgState
> {
  constructor(props: PhoneInputGfgProps) {
    super(props);
    this.state = { phone: '' };
  }

  handlePhoneChange = (phone: string) => {
    this.setState({ phone });
    this.props.onChange(phone);
  };

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
          onChange={this.handlePhoneChange}
          containerStyle={customContainerStyle}
          inputStyle={customInputStyle}
          inputClass="!px-2 border border-custom-gray-light !rounded placeholder:font-light outline-none focus-visible:ring-2"
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
