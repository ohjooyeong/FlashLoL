import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SummonerNameFormProps = {
  onSubmitSummonerName: (summonerName: string) => void;
  area: string;
};

function SummonerSearchForm({
  onSubmitSummonerName,
  area,
}: SummonerNameFormProps) {
  const [input, setInput] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') return;
    onSubmitSummonerName(input);
  };

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
  width: ${props => (props.area === 'Home' ? '640px' : '260px')};
  display: ${props => (props.area === 'Home' ? 'inline-block' : 'inline')};
  position: relative;
  text-align: left;
`;

const SearchInput = styled.input<{ area: string }>`
  display: block;
  width: 100%;
  height: ${props => (props.area === 'Home' ? '50px' : '32px')};
  line-height: ${props => (props.area === 'Home' ? '50px' : '32px')};
  border: none;
  outline: none;
  font-size: ${props => (props.area === 'Home' ? '16px' : '12px')};
  padding: 0 50px 0 16px;
  border-radius: 4px;
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
  top: ${props => (props.area === 'Home' ? '12px' : '8px')};
  right: ${props => (props.area === 'Home' ? '16px' : '10px')};
`;

const CusFontAwesome = styled(FontAwesomeIcon)<{ area: string }>`
  color: black;
  font-weight: 900;
  font-size: ${props => (props.area === 'Home' ? '30px' : '14px')};
  display: inline-block;
  line-height: 1;
  text-rendering: auto;
  background-color: white;
  cursor: pointer;
`;

export default SummonerSearchForm;
