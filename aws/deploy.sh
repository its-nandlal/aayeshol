#!/bin/bash
# ============================================
# AWS ECS Deployment Script for Aayeshol
# ============================================

set -e

# Configuration
AWS_REGION="ap-south-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
API_REPO="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/aayeshol-api"
WEB_REPO="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/aayeshol-web"
CLUSTER_NAME="aayeshol-cluster"

echo "🚀 Starting deployment to AWS ECS..."
echo "Account ID: $ACCOUNT_ID"
echo "Region: $AWS_REGION"

# Step 1: Login to ECR
echo "📦 Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Step 2: Build and Push API
echo "🔨 Building API image..."
docker build -f docker/api.Dockerfile -t aayeshol-api:latest .
docker tag aayeshol-api:latest $API_REPO:latest
docker push $API_REPO:latest
echo "✅ API image pushed!"

# Step 3: Build and Push Web
echo "🔨 Building Web image..."
docker build -f docker/web.Dockerfile -t aayeshol-web:latest .
docker tag aayeshol-web:latest $WEB_REPO:latest
docker push $WEB_REPO:latest
echo "✅ Web image pushed!"

# Step 4: Update ECS Services (if they exist)
echo "🔄 Updating ECS services..."
aws ecs update-service --cluster $CLUSTER_NAME --service aayeshol-api --force-new-deployment --no-cli-pager || echo "API service not found, create it manually"
aws ecs update-service --cluster $CLUSTER_NAME --service aayeshol-web --force-new-deployment --no-cli-pager || echo "Web service not found, create it manually"

echo "✅ Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Create ECS Cluster: aws ecs create-cluster --cluster-name $CLUSTER_NAME"
echo "   2. Register Task Definitions from aws/ecs-task-*.json"
echo "   3. Create Services from ECS Console"
echo ""
