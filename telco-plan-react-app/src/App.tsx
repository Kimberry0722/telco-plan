import Box from '@mui/material/Box';
import './App.scss';
import PlanCard from './components/plan-card/plan-card';
import type { Plan } from './models/plan.model';
import { useEffect, useState } from 'react';
import PlanToggler from './components/plan-toggler/plan-toggler';
import { PlanApi } from './apis/plan.api';
import type { PlanType } from './constants/plan-type.enum';

function App() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planType, setPlanType] = useState('');
  const [planTypes, setPlanTypes] = useState<PlanType[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const handlePlanTypeChange = (newType: string) => {
    setPlanType(newType);
    setExpandedIds(new Set()); // Reset all expanded cards
  };

  const handleToggle = (id: number) => {
    const isExpanded = expandedIds.has(id);

    if (isExpanded) {
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      // Fetch only if not expanded
      PlanApi.getPlanById(id)
        .then((fetchedPlan) => {
          setPlans((currPlan) =>
            currPlan.map((plan) =>
              plan.id === fetchedPlan.id
                ? { ...plan, descriptions: fetchedPlan.descriptions }
                : plan
            )
          );
          setExpandedIds((prev) => new Set(prev).add(id)); // Expand after fetched
        })
        .catch((err) => console.error('Failed to fetch specific plan:', err));
    }
  };

  useEffect(() => {
    PlanApi.getAllPlans()
      .then((fetchedPlans) => {
        setPlans(fetchedPlans);
        const distinctTypes = Array.from(
          new Set(fetchedPlans.map((p) => p.type))
        );
        setPlanTypes(distinctTypes);
        setPlanType(distinctTypes[0]);
      })
      .catch((err) => console.error('Failed to fetch plans:', err));
  }, []);

  return (
    <>
      <h1>Choose Your Plan</h1>
      <PlanToggler
        value={planType}
        onChange={handlePlanTypeChange}
        options={planTypes}
      />
      <h1></h1>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {plans
          .filter((plan) => plan.type === planType)
          .map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              expanded={expandedIds.has(plan.id)}
              onToggleExpand={() => handleToggle(plan.id)}
            />
          ))}
      </Box>
    </>
  );
}

export default App;
