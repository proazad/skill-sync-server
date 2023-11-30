router.put("/users/enroll/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const filter = { _id: id };
    const checkingOnceEnroll = await userCollection.findById(filter);
    if (checkingOnceEnroll.enrolledCourseId.some(courseId => user.enrolledCourseId.includes(courseId))) {
        return res.status(400).send({ error: "Course is already added" });
    }

    const updateDoc = {
        $push: {
            enrolledCourseId: user.enrolledCourseId,
            studentTotalPayment: user.studentTotalPayment
        }
    };

    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
});
