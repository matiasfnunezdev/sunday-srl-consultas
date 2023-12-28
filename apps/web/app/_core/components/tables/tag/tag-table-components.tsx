import { SubMenuToggleButton } from "../../sub-menu-toggle-button/sub-menu-toggle-button";

interface GetCustomStyles {
  option: (provided: any, state: any) => any;
  menu: (provided: any, state: any) => any;
  control: (provided: any) => any;
  singleValue: (provided: any, state: any) => any;
  input: (provided: any) => any;
  valueContainer: (provided: any) => any;
}

export function DropdownIndicator(): any {
  return null;
}
export function IndicatorsContainer(): any {
  return null;
}
export function ValueContainer({ children }: any): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        fontFamily: 'Lato, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        color: 'white',
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 8
      }}
    >
      {children}
      <SubMenuToggleButton color="black" toggled={false} />
    </div>
  );
}

export const getCustomStyles = (is2xlScreen: boolean): GetCustomStyles  => {
  return {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'blue' : 'black',
      padding: 20,
      zIndex: 1000,
    }),
    menu: (provided: any) => ({
      ...provided,
      width: '100%',
      height: is2xlScreen ? 40 : 40,
      backgroundColor: 'white',
      right: 0,
      zIndex: 1000,
    }),
    control: (provided: any) => ({
      ...provided,
      height: is2xlScreen ? 40 : 40,
      borderRadius: '6px',
      width: '100%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#d9d9d9',
      boxShadow: 'none',
      '&:hover': {
        borderWidth: 2,
        borderColor: '#368D9D',
        boxShadow: 'none',
      },
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return {
        ...provided,
        opacity,
        transition,
        color: 'black',
        paddingLeft: 5,
      };
    },
    input: (provided: any) => ({
      ...provided,
      color: '#FFFFFF',
      fontFamily: 'Lato',
      padding: 0,
      margin: 0,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0,
      margin: 0,
    }),
  }
};

export function MyOption(props: any): JSX.Element {
  const { innerProps, innerRef, data } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex w-full cursor-pointer items-center first:rounded-t-[0.3125rem] last:rounded-b-[0.3125rem] border border-[#a6a6a6]  ${
        props.isFocused ? 'bg-[#CDDEE1]' : 'bg-white'
      } p-3`}
    >
      <div className="flex w-full flex-col ">
        <span className="text-base font-lato font-medium leading-[150%] text-black">
          {props.label}
        </span>
        {data.subtitle ? (
          <span className="text-base text-gray-400">{data.subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}