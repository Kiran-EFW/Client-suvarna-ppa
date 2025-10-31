#!/bin/bash

# GCP Firewall Setup Script
# Run this using gcloud CLI from your local machine or GCP Cloud Shell

echo "🔥 Setting up GCP Firewall Rules for Suvarna Capital PPA Marketplace..."

# Allow HTTP traffic
gcloud compute firewall-rules create allow-http-scalix \
    --allow tcp:80 \
    --target-tags scalix \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic to Scalix VM" \
    --direction INGRESS || echo "HTTP rule may already exist"

# Allow HTTPS traffic
gcloud compute firewall-rules create allow-https-scalix \
    --allow tcp:443 \
    --target-tags scalix \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTPS traffic to Scalix VM" \
    --direction INGRESS || echo "HTTPS rule may already exist"

echo "✅ Firewall rules configured!"
echo "📋 Your application will be accessible at: http://35.225.94.127"

