import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

const ProfileCard = () => {
    return (
        <Card
            style={{
                boxShadow: 'none',
                cursor: 'pointer'
            }}
        >
            <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
            />
        </Card>
    );
};

export default ProfileCard;