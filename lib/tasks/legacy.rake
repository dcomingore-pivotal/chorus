namespace :legacy do
  desc "Drop and recreate legacy test database, then import legacy data"
  task :setup => :environment do
    Legacy.connection.execute "DROP DATABASE IF EXISTS chorus_legacy_test"
    Legacy.connection.execute "CREATE DATABASE chorus_legacy_test"
    system "psql --host=localhost --port=8543 --username=edcadmin chorus_legacy_test < #{File.join(Rails.root, 'db', 'legacy', 'legacy.sql')}"
  end
end

namespace :db do
  namespace :test do
    namespace :prepare do
      task :legacy => "legacy:setup"
    end
  end
end