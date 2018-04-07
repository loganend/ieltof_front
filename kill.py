import subprocess
import sys
import re
import os
import itertools

def get_pids():

	command = "sudo lsof -i :%s | awk '{print $2}'" % 4000
	pids = subprocess.check_output(command, shell=True)
	command2 = "sudo lsof -i :%s | awk '{print $1}'" % 4000
	titles = subprocess.check_output(command2, shell=True)
	pids = pids.split()
	titles = titles.split()
	dictionary = dict(zip(titles, pids))

	for key, value in dictionary.iteritems():
		if (key == "node"):
			return value


if __name__ == '__main__':

	pid = get_pids()
	print(pid)
	command = 'sudo kill -9 ' + pid;
	print(command)
	os.system(command)