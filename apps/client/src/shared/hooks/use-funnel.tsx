import { Children, ReactElement, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface StepProps {
  children: ReactNode;
  name?: string;
}

interface FunnelProps {
  children: ReactNode;
}

export const useFunnel = (totalSteps: number, completePath: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = Number(searchParams.get('step')) || 1;

  const setStep = (stepChange: number) => {
    const newStep = step + stepChange;

    if (newStep < 1) {
      navigate(-1);
    } else if (newStep > totalSteps) {
      navigate(completePath);
    } else {
      setSearchParams({ step: String(newStep) });
    }
  };

  const Step = ({ children }: StepProps) => <>{children}</>;

  const Funnel = ({ children }: FunnelProps) => {
    const childrenArray = Children.toArray(
      children,
    ) as ReactElement<StepProps>[];

    const stepMap = new Map(
      childrenArray.map((child, index) => [
        child.props.name ?? String(index + 1),
        child,
      ]),
    );

    return <>{stepMap.get(String(step))}</>;
  };

  return { Funnel, Step, setStep };
};
