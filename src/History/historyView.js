import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function Transactions() {
  const transactionHistory = [
    {
      transactionID: '01',
      timestamp: '',
      sender: '',
      recipient: '',
      amount: '',
      currency: '',
      transactionType: '',
      status: '',
    },
    // {
    //   transactionID: '02',
    //   timestamp: '',
    //   sender: '',
    //   recipient: '',
    //   amount: '',
    //   currency: '',
    //   transactionType: '',
    //   status: '',
    // },
  ];

  const [hoveredTransaction, setHoveredTransaction] = React.useState(null);

  const handleMouseEnter = (index) => {
    setHoveredTransaction(index);
  };

  const handleMouseLeave = () => {
    setHoveredTransaction(null);
  };

  return (
    <div>
      {transactionHistory.map((transaction, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 500,
            marginBottom: 2,
            opacity: hoveredTransaction === index ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <CardHeader title={`Transaction ID: ${transaction.transactionID}`} />
          <CardContent>
            {hoveredTransaction === index ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  Timestamp: {transaction.timestamp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sender: {transaction.sender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recipient: {transaction.recipient}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: {transaction.amount} {transaction.currency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transaction Type: {transaction.transactionType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {transaction.status}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Hover to view details
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button fullWidth variant="outlined">
              View Details
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button variant="outlined" fullWidth>
        Show All Transactions
      </Button>
    </div>
  );
}
