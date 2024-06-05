const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      amount = 100;
    }
    if (amount > 50) {
      points += (amount - 50);
    }
    return points;
};

export const rewardTableColumns = [
	{
		name: 'Customer',
		selector: row => row.customerId,
	},
	{
		name: 'Amout',
		selector: row => row.amount,
		sortable: true,
	},
    {
		name: 'Points',
		selector: row => row.amount,
        format: row => calculatePoints(row.amount),
		sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.date,
		sortable: true,
	},
];