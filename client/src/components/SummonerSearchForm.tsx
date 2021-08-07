import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SummonerNameFormProps = {
  area: string;
  history: any;
};

function SummonerSearchForm({ area, history }: SummonerNameFormProps) {
  const [input, setInput] = useState('');

  const onSubmit = useCallback<(e: FormEvent) => void>(
    e => {
      e.preventDefault();
      if (input === '') return;
      if (input) {
        history.push(`/summoner/${input}`);
      }
      setInput('');
    },
    [input],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SearchFormContent area={area}>
      <form className="SummonerNameForm" onSubmit={onSubmit}>
        <SearchInput
          area={area}
          onChange={onChange}
          value={input}
          placeholder="소환사명을 입력하세요"
        />
        <SearchBtn area={area} type="submit">
          <CusFontAwesome area={area} icon={faSearch} />
        </SearchBtn>
      </form>
    </SearchFormContent>
  );
}

const SearchFormContent = styled.div<{ area: string }>`
  width: ${props => (props.area === 'Home' ? '320px' : '150px')};
  display: ${props => (props.area === 'Home' ? 'inline-block' : 'inline')};
  position: relative;
  text-align: left;
  // 475px
  ${props => props.theme.device.mobile} {
    width: ${props => (props.area === 'Home' ? '450px' : '200px')};
  }
  // 576px
  ${props => props.theme.device.tabletS} {
    width: ${props => (props.area === 'Home' ? '550px' : '200px')};
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    width: ${props => (props.area === 'Home' ? '640px' : '260px')};
  }
`;

const SearchInput = styled.input<{ area: string }>`
  display: block;
  width: 100%;
  height: ${props => (props.area === 'Home' ? '40px' : '24px')};
  line-height: ${props => (props.area === 'Home' ? '40px' : '24px')};
  border: none;
  outline: none;
  font-size: ${props => (props.area === 'Home' ? '14px' : '6px')};
  padding: 0 50px 0 16px;
  border-radius: 4px;
  // 576px
  ${props => props.theme.device.tabletS} {
    font-size: ${props => (props.area === 'Home' ? '14px' : '8px')};
  }

  // 768px
  ${props => props.theme.device.tabletM} {
    height: ${props => (props.area === 'Home' ? '50px' : '32px')};
    line-height: ${props => (props.area === 'Home' ? '50px' : '32px')};
    font-size: ${props => (props.area === 'Home' ? '16px' : '12px')};
  }
`;

const SearchBtn = styled.button<{ area: string }>`
  position: absolute;
  margin: 0;
  padding: 0;
  border: none;
  width: auto;
  overflow: visible;
  line-height: normal;
  font: white;
  color: white;
  top: ${props => (props.area === 'Home' ? '8px' : '4px')};
  right: ${props => (props.area === 'Home' ? '14px' : '8px')};
  // 768px
  ${props => props.theme.device.tabletM} {
    top: ${props => (props.area === 'Home' ? '12px' : '8px')};
    right: ${props => (props.area === 'Home' ? '16px' : '10px')};
  }
`;

const CusFontAwesome = styled(FontAwesomeIcon)<{ area: string }>`
  color: black;
  font-weight: 900;
  font-size: ${props => (props.area === 'Home' ? '26px' : '10px')};
  display: inline-block;
  line-height: 1;
  text-rendering: auto;
  background-color: white;
  cursor: pointer;
  // 768px
  ${props => props.theme.device.tabletM} {
    font-size: ${props => (props.area === 'Home' ? '30px' : '14px')};
  }
`;

export default SummonerSearchForm;
