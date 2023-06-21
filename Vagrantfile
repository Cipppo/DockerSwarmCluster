# Modificato da Vic 2023-05-24
# Al momento, questo script configura i prerequisiti per Docker Swarm.
# Non dispiega il master e i worker
# Non dispiega Docker Registry

## Variabili
VAGRANTFILE_VERSION = "2"
# BASEBOX = "ubuntu/xenial64"
BASEBOX = "debian/bullseye64"
MEMORY = "512"
CPUS = 2
INTERNAL_MANAGER_IP = "10.133.7.101"
WORKERS = 2
# Aggiungo l'ultima (terza) cifra per formare l'IP
INTERNAL_WORKER_IP = "10.133.7.11"

######################################### 

## Scripts
# Install Docker Script with convenience script
$install_docker_script = <<SCRIPT
  apt-get update
  apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  # Aggiungi l'utente vagrant al gruppo docker
  usermod -aG docker vagrant

  # Abilita l'avvio automatico di Docker
  systemctl enable docker
SCRIPT

# Script per l'inizializzazione di Docker Swarm e salvataggio dell'ID di join
$init_swarm_script = <<SCRIPT
  # Inizializza Docker Swarm e salva l'ID di join
  docker swarm init --advertise-addr #{INTERNAL_MANAGER_IP}
  manager_token=$(docker swarm join-token --quiet manager)
  echo "Swarm initialized. Join token: $manager_token"
  echo "$manager_token" > /vagrant/join_token.txt
SCRIPT



######################################### 

# Configurazione di Vagrant
Vagrant.configure(VAGRANTFILE_VERSION) do |config|
  config.vm.box = BASEBOX

  config.vm.provider "virtualbox" do |vb|
    vb.memory = MEMORY
    vb.cpus = CPUS
  end

  # Manager Node
  config.vm.define "manager" do |manager|
    manager.vm.network "private_network", ip: INTERNAL_MANAGER_IP
    manager.vm.hostname = "manager"
    #manager.vm.provision "shell", inline: $install_docker_script
    #manager.vm.provision "shell", inline: $init_swarm_script
  end

  # Worker Nodes
  (1..WORKERS).each do |i|
    config.vm.define "worker#{i}" do |worker|
      worker.vm.network "private_network", ip: "#{INTERNAL_WORKER_IP}#{i}"
      worker.vm.hostname = "worker#{i}"
      #worker.vm.provision "shell", inline: $install_docker_script
    end
  end
end
