import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './plan-card.scss';
import Typography from '@mui/material/Typography';
import type { Plan } from '../../models/plan.model';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { PlanType } from '../../constants/plan-type.enum';

interface PlanCardProps {
  plan: Plan;
  expanded: boolean;
  onToggleExpand: () => void;
}

export default function PlanCard({
  plan,
  expanded,
  onToggleExpand,
}: PlanCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        background: 'white',
        color: 'black',
        fontWeight: 'bold',
        borderRadius: '2rem',
        boxShadow: 5,
        flex: '1 1 auto',
        height: 'min-content',
      }}
    >
      <div className="plan-card-header">
        <div className="plan-info">
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {plan.name}
          </Typography>
          {plan.type === PlanType.PREPAID && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {plan.dataLimit}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {plan.dataSpeed}
              </Typography>
            </>
          )}
          {plan.type === PlanType.POSTPAID && (
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {plan.dataLimit}
            </Typography>
          )}
        </div>
        <div className="plan-pricing">
          {plan.type === PlanType.POSTPAID && (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {plan.currency}
                  {plan.price}
                </Typography>
                <Typography variant="subtitle2">/mth</Typography>
              </div>
            </>
          )}

          {plan.type === PlanType.PREPAID && (
            <>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {plan.currency}
                {plan.price}
              </Typography>
              <Typography variant="caption">
                valid for {plan.validity}
              </Typography>
            </>
          )}
        </div>
      </div>

      <CardActions disableSpacing sx={{ placeContent: 'center' }}>
        <Button
          variant="text"
          sx={{
            '&:focus': {
              outline: 'none',
            },
          }}
          onClick={onToggleExpand}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ maxWidth: 200, placeSelf:'center' }}>
          {plan.descriptions &&
            plan.descriptions.map((desc, idx) => (
              <Typography key={idx} variant="body2" gutterBottom >
                {desc}
              </Typography>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
