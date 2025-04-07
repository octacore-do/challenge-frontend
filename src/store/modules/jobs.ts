import { defineStore } from "pinia";
import { computed, ref, onMounted } from "vue";
import type { Job } from "../../store/types/store";
import { useMyFetch } from "../../hooks/http";

export const useJobStore = defineStore("job", () => {
  const jobs = ref<Job[] | null>(null);

  const jobsToSelect = computed((): Job[] => {
    if (jobs.value) {
      return jobs.value.map((jobValue) => ({
        title: jobValue.title,
        salary: jobValue.salary,
        expire_at: jobValue.expire_at,
        description: jobValue.description,
      }));
    }
    return [];
  });

  const fetchJobsData = async () => {
    const { statusCode, data } = await useMyFetch("/api/recruitment/jobs")
      .get()
      .json();
    if (statusCode.value === 200) {
      jobs.value = data.value.data;
    }
  };

  const createJob = async (payload: Job) => {
    const { statusCode, data } = await useMyFetch("/api/recruitment/jobs")
      .post(payload)
      .json();
    if (statusCode.value === 2001) {
      jobs.value?.push(data.value.data);
      return { data, statusCode };
    }
  };

  const updateJob = async (payload: Job, id: number) => {
    const { statusCode } = await useMyFetch(`${id}`).put(payload).json<Job>();
    return { statusCode };
  };

  const deleteJob = async (id: number) => {
    const { statusCode } = await useMyFetch(`${id}`).delete(id).json<Job>();
    return { statusCode };
  };

  onMounted(() => {
    if (jobs.value === null || jobs.value.length === 0) fetchJobsData();
  });

  return {
    fetchJobsData,
    deleteJob,
    updateJob,
    createJob,
    jobsToSelect,
    jobs,
  };
});
