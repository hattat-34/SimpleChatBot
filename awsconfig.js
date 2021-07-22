const awsconfig = {
    Auth: {
        identityPoolId: 'eu-central-1:52c19d56-d138-474a-ab82-ad4f205ee39a',
        region: 'eu-central-1'
    },
    Interactions: {
        bots: {
            "SpaceTrip": {
                "name": "SpaceTrip",
                "alias": "$LATEST",
                "region": "eu-central-1",
            },
        }
    }
}

export default awsconfig