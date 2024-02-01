const { Sequelize } = require("sequelize");
const Visitors = require("../models/visitor.model");

const visitorController = {
    async createVisitor(req, res) {
        try {
            const { entryTime, exitTime } = req.body;
            const newUser = await Visitors.create({ entryTime, exitTime });
            res.json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async getVisitorsStat(req, res) {
        let { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            res.status(403).json({ message: 'Please provide startDate and endDate' })
        }

        // validating time period not greater then 10 days
        let validTime = validateTimePeriod(startDate, endDate);
        if (!validTime) {
            return res.status(400).json({ error: 'Time is not more than 10 days.' });
        }

        try {
            // Fetch records from database
            const records = await Visitors.findAll({
                where: {
                    entryTime: {
                        [Sequelize.Op.between]: [startDate, endDate],
                    },
                },
            });

            const totalRecords = records.length;

            // Calculating average visit times for every date
            const averageVisitTimes = calculateAverageVisitTimes(records);

            // Respond with the result
            res.json({ totalRecords, averageVisitTimes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

//funcion for validate time period
const validateTimePeriod = (startDate, endDate) => {
    let daysCount = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    return daysCount <= 10;
};

// function to calculate average visit times for each date
const calculateAverageVisitTimes = (records) => {
    const averageVisitTimes = {};

    records.forEach((record) => {
        const date = record.entryTime.toISOString().split('T')[0];

        if (!averageVisitTimes[date]) {
            averageVisitTimes[date] = {
                date,
                totalVisitTime: 0,
                visitCount: 0,
            };
        }

        const entryTime = new Date(record.entryTime);
        const exitTime = new Date(record.exitTime);
        const visitTime = (exitTime - entryTime) / (1000 * 60);

        averageVisitTimes[date].totalVisitTime += visitTime;
        averageVisitTimes[date].visitCount++;
    });

    // Calculate average visit time for each date
    const result = Object.values(averageVisitTimes).map(({ date, totalVisitTime, visitCount }) => ({
        date,
        averageVisitTime: visitCount > 0 ? totalVisitTime / visitCount : 0,
    }));

    return result;
};

module.exports = {visitorController};