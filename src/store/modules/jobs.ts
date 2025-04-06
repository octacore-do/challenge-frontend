import { defineStore } from "pinia";
import { computed, ref, onMounted } from "vue";
import type { Job } from "../../store/types/store";
import { useMyFetch } from "../../hooks/http";

export const useStatsStore = defineStore("stats", () => {
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
    const { statusCode, data } = await useMyFetch("").get().json<Job[]>();
    if (statusCode.value === 200) {
      jobs.value = data.value;
    }
  };

  const createJob = async (payload: Job) => {
    const { statusCode, data } = await useMyFetch("").post(payload).json<Job>();
    if (statusCode.value === 200) {
      jobs.value?.push(data.value!);
    }
    return { data, statusCode };
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
  };
});
