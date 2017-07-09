webpack
webpack_return_code=$?
if ["$webpack_return_code" != "0"]
then
  echo "FRONTEND BUILD FAILURE"
  exit 1
fi



./node_modules/karma/bin/karma start --single-run
karma_test_return_code=$?

if [ "$karma_test_return_code" -ne "0" ]
then
  echo "FRONTEND TEST FAILURE"
  exit 1
fi


mvn clean test -o
maven_test_return_code=$?

if ["$maven_test_return_code" != "0"]
then
  echo "BACKEND BUILD OR TEST FAILURE"
  exit 1
fi



branch_name=$1
git push heroku "$branch_name:master"
